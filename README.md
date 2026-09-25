# @eqiqs/mcp-server

MCP server launcher for [EQIQs](https://eqiqs.com) — bring Enneagram, MBTI, Big Five and 18 more
frameworks into Claude, ChatGPT and any other Model Context Protocol client.

## Remote (recommended)

Clients with remote MCP support connect directly:

```
https://adgmsnwjynqkhawhioil.supabase.co/functions/v1/mcp-server
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

**Your profile**
- `get_my_profile` — your own 21-framework profile
- `start_assessment` / `submit_assessment` — take the assessment inside the chat

**People**
- `list_profiles` / `get_profile` — people in your workspace
- `create_profile` — add someone new
- `invite_person` / `list_invites` — send a private assessment link and check its status

**Pairs and teams**
- `list_relationships` — saved pairings
- `score_compatibility` — compare two people (business, romantic, friendship or co-parenting)
- `score_team` — whole-team read for 2–12 people or a department
- `team_playbook` — how a team works best together
- `prep_meeting` — meeting prep for the people attending
- `suggest_lead` — who is best placed to lead a project

**Notes**
- `add_note` / `list_notes` — private notes on people in your workspace

Personal details (love language, attachment style, date of birth) are withheld in business contexts.

Output is decision-support only and must never be the sole basis for hiring, promotion or
termination decisions.

## License

MIT
