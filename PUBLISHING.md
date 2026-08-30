# Publishing this package as a public repo

Glama (and most MCP directories) require a **public GitHub repository** whose URL matches
`package.json` → `repository.url`. Right now that points at
`https://github.com/eqiqs/mcp-server`, which does not exist publicly — that is the exact
reason the Glama submission was rejected.

## One-time setup

1. Create a public repo named `mcp-server` under the `eqiqs` GitHub org (no README/license —
   this folder already has both).
2. From a local copy of this project:

   ```bash
   cd mcp-server
   git init
   git add .
   git commit -m "EQIQs MCP server"
   git branch -M main
   git remote add origin https://github.com/eqiqs/mcp-server.git
   git push -u origin main
   ```

3. Confirm `https://github.com/eqiqs/mcp-server` loads while signed out.
4. Optional but recommended — publish to npm so `npx -y @eqiqs/mcp-server` works:

   ```bash
   npm publish --access public
   ```

5. Resubmit at https://glama.ai/mcp/servers (reply to the rejection email with the repo URL).

## Keeping it in sync

The canonical source lives in this project under `mcp-server/`. After changes here, copy the
folder into the public repo and push again. Files that must stay consistent:

- `package.json` (`repository.url`, `version`)
- `glama.json` (name, description, homepage, endpoint)
- `README.md` (setup instructions shown on the directory listing)
