#!/usr/bin/env node
/**
 * EQIQs MCP server launcher.
 *
 * The EQIQs MCP server is hosted (Streamable HTTP + OAuth 2.1). This bin
 * script is a thin stdio <-> HTTP bridge for MCP clients that only speak
 * stdio, and a `--url` helper for clients that support remote servers.
 *
 * Usage:
 *   npx @eqiqs/mcp-server              # start the stdio bridge
 *   npx @eqiqs/mcp-server --url        # print the remote endpoint
 *   npx @eqiqs/mcp-server --help
 *
 * Env:
 *   EQIQS_MCP_URL    override the endpoint (default: production)
 *   EQIQS_MCP_TOKEN  bearer token for clients that cannot do OAuth
 */

const DEFAULT_URL = "https://adgmsnwjynqkhawhioil.supabase.co/functions/v1/mcp-server";
const ENDPOINT = process.env.EQIQS_MCP_URL || DEFAULT_URL;
const TOKEN = process.env.EQIQS_MCP_TOKEN || "";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  process.stdout.write(
    [
      "@eqiqs/mcp-server — EQIQs Model Context Protocol server",
      "",
      "Usage:",
      "  eqiqs-mcp-server            Start the stdio <-> HTTP bridge",
      "  eqiqs-mcp-server --url      Print the remote MCP endpoint",
      "  eqiqs-mcp-server --help     Show this message",
      "",
      "Environment:",
      "  EQIQS_MCP_URL    Override the MCP endpoint",
      "  EQIQS_MCP_TOKEN  Bearer token (for clients without OAuth support)",
      "",
      "Docs: https://eqiqs.com/integrations/ai-coaching",
      "",
    ].join("\n"),
  );
  process.exit(0);
}

if (args.includes("--url")) {
  process.stdout.write(`${ENDPOINT}\n`);
  process.exit(0);
}

/** Send one JSON-RPC message to the hosted server and return the parsed reply. */
async function forward(message) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(message),
  });

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (!response.ok) {
    return {
      jsonrpc: "2.0",
      id: message.id ?? null,
      error: {
        code: -32000,
        message: `EQIQs MCP request failed [${response.status}]: ${raw.slice(0, 500)}`,
      },
    };
  }

  if (contentType.includes("text/event-stream")) {
    // Take the last `data:` frame of the SSE response.
    const frames = raw
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .filter(Boolean);
    const last = frames[frames.length - 1];
    if (!last) return null;
    try {
      return JSON.parse(last);
    } catch {
      return null;
    }
  }

  if (!raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return {
      jsonrpc: "2.0",
      id: message.id ?? null,
      error: { code: -32700, message: "Invalid JSON returned by the EQIQs MCP server" },
    };
  }
}

function write(payload) {
  if (payload == null) return;
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

let buffer = "";
let pending = 0;
let stdinClosed = false;

function maybeExit() {
  if (stdinClosed && pending === 0) process.exit(0);
}

process.stdin.setEncoding("utf8");

process.stdin.on("data", async (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    if (!line) continue;

    let message;
    try {
      message = JSON.parse(line);
    } catch {
      write({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error: stdin line was not valid JSON-RPC" },
      });
      continue;
    }

    pending += 1;
    try {
      const reply = await forward(message);
      // Notifications (no id) expect no response.
      if (message.id !== undefined) write(reply);
    } catch (error) {
      write({
        jsonrpc: "2.0",
        id: message.id ?? null,
        error: { code: -32000, message: error instanceof Error ? error.message : String(error) },
      });
    } finally {
      pending -= 1;
      maybeExit();
    }
  }
});

process.stdin.on("end", () => {
  stdinClosed = true;
  maybeExit();
});
