# @eqiqs/mcp-server

> EQIQs™ is a 21-framework personality and compatibility assessment for coaching, communication and team development.

`@eqiqs/mcp-server` connects a person's consented EQIQs workspace to MCP-compatible AI clients. It supports coaching, communication preparation, onboarding, and team-development conversations through a hosted MCP server secured with OAuth 2.1.

## Connect to the hosted server

Get the connection address at https://www.eqiqs.com/mcp

Sign in with OAuth 2.1. Each tool call is scoped to the authenticated user's EQIQs data. Never share an access token or use another person's data without permission.

## Use a stdio bridge

For clients that support stdio MCP connections but not remote MCP, add:

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

### Environment variables

| Variable | Purpose |
| --- | --- |
| `EQIQS_MCP_URL` | Override the hosted MCP endpoint. |
| `EQIQS_MCP_TOKEN` | Provide a bearer token only for a client that cannot complete OAuth. |

## Capabilities

The available tools operate on the authenticated user's workspace and may include:

- `get_my_profile`, `list_profiles`, and `get_profile` for consented profile data.
- `create_profile`, `start_assessment`, and `submit_assessment` for a person who is participating knowingly.
- `add_note`, `list_notes`, `invite_person`, and `list_invites` for coaching and follow-up workflows.
- `prep_meeting` for communication preparation and `list_relationships` for saved pairings.
- `score_compatibility` for a context-aware read between two people in a documented business, romantic, friendship, or coparenting context.
- `score_team` for group-level communication and collaboration discussion prompts.
- `generate_narrative` for a plain-language coaching narrative on eligible tiers.
- `suggest_lead` for discussion support only; it must not be used to select, rank, or assign people to leadership roles.

Compatibility outputs should be read with the returned data coverage. They are decision support, not a factual determination about a person's ability, potential, or fit.

## Responsible use

Use EQIQs only for consent-based coaching, communication, self-reflection, onboarding after employment begins, and team development. Do **not** use it for employment screening, selection, termination, promotion, compensation, discipline, performance ratings, role assignment, or any other high-stakes decision.

EQIQs' MBTI-style and DISC-style results are proprietary approximations, not licensed MBTI® or DISC® administrations. The public methodology explains framework provenance, evidence status, and limitations.

## References

- [EQIQs MCP setup](https://www.eqiqs.com/mcp)
- [Integration guide](https://www.eqiqs.com/integrate) and [developer overview](https://www.eqiqs.com/for-developers)
- [API documentation](https://www.eqiqs.com/api-docs) and [API quickstart](https://www.eqiqs.com/api-quickstart)
- [Unified Engine](https://www.eqiqs.com/unified-engine) and [technology overview](https://www.eqiqs.com/technology)
- [Examples and sample outputs](https://www.eqiqs.com/examples)
- [Methodology](https://www.eqiqs.com/methodology)
- [Responsible Use Policy](https://www.eqiqs.com/responsible-use)
- [Trust Center](https://www.eqiqs.com/trust), [privacy](https://www.eqiqs.com/privacy), and [system status](https://www.eqiqs.com/status)
- [Product changelog](https://www.eqiqs.com/changelog) and [API changelog](https://www.eqiqs.com/api-changelog)
- [Claude Skill](https://www.eqiqs.com/claude-skill)

## License

MIT
