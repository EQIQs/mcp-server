# @eqiqs/mcp-server

MCP server launcher for [EQIQs](https://eqiqs.com) — bring Enneagram, MBTI, Big Five and 18 more
frameworks into Claude, ChatGPT and any other Model Context Protocol client.

## Remote (recommended)

Clients with remote MCP support connect directly:

```
https://adgmsnwjynqkhawhioil.supabase.co/functions/v1/mcp
```

Sign-in uses OAuth 2.1 — every tool call is scoped to your own EQIQs data.

## Stdio bridge

For clients that only speak stdio:

```json
{
  "mcpServers": {
    "eqiqs": {
      "command": "npx",
      "args": ["-y", "@eqiqs/mcp-server"]
    }
  }
}
```

### Environment

| Variable | Purpose |
| --- | --- |
| `EQIQS_MCP_URL` | Override the MCP endpoint |
| `EQIQS_MCP_TOKEN` | Bearer token for clients that cannot complete OAuth |

## Tools

- `get_my_profile` — your own 21-framework profile
- `list_profiles` / `get_profile` — people in your workspace
- `create_profile` — add someone new
- `list_relationships` — saved pairings
- `score_compatibility` — compare two people in a business, romantic, friendship or co-parenting context

Output is decision-support only and must never be the sole basis for hiring, promotion or
termination decisions.

## License

MIT
