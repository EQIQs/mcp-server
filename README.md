# @eqiqs/mcp-server

MCP server launcher for [EQIQs](https://eqiqs.com) â€” bring Enneagram, MBTI, Big Five and 18 more
frameworks into Claude, ChatGPT and any other Model Context Protocol client.

## Remote (recommended)

Clients with remote MCP support connect directly:

```
https://adgmsnwjynqkhawhioil.supabase.co/functions/v1/mcp-server
```

Sign-in uses OAuth 2.1 â€” every tool call is scoped to your own EQIQs data.

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

- `get_my_profile` â€” your own 21-framework profile
- `list_profiles` / `get_profile` â€” people in your workspace
- `create_profile` â€” add someone new
- `add_note` / `list_notes` â€” save and read check-ins on a person
- `invite_person` / `list_invites` â€” invite someone to take the assessment and track whether they finished
- `start_assessment` / `submit_assessment` â€” take a framework in chat, one question at a time, and save the result
- `prep_meeting` â€” how to work with each attendee and which pairings need care
- `suggest_lead` â€” rank people for leading a piece of work
- `list_relationships` â€” saved pairings
- `score_compatibility` â€” compare two people in a business, romantic, friendship or co-parenting context
- `score_team` â€” score a whole group (2-12 people, or a department) and roll every pairing up into one team read
- `generate_narrative` â€” plain-language coaching narrative for a person or a pair (premium, metered)


Output is decision-support only and must never be the sole basis for hiring, promotion or
termination decisions.

## License

MIT

