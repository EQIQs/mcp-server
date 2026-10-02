# Publishing and registry releases

> EQIQs™ is a 21-framework personality and compatibility assessment for coaching, communication and team development.

This public GitHub repository is the canonical source for the EQIQs MCP launcher and its directory metadata. Keep its README, `glama.json`, `package.json`, and registry workflow consistent with the live hosted endpoint.

## Release a new registry version

1. Update `package.json` to the intended semantic version and test the launcher locally.
2. Commit and push the change to `main`.
3. Create and push an annotated tag that matches the package version, for example `v0.1.1`.

```bash
git tag -a v0.1.1 -m "EQIQs MCP 0.1.1"
git push origin v0.1.1
```

A `v*` tag triggers `.github/workflows/publish-mcp.yml`. The workflow authenticates with GitHub OIDC, validates the generated MCP Registry manifest, and publishes the matching version.

## npm publication

Publishing to npm is a separate, intentional release step. After a tagged source release passes the full test suite, a maintainer with npm package access may run:

```bash
npm publish --access public
```

Do not publish a version that was not tested, tagged, and reviewed for consistency with the hosted endpoint.

## Public metadata rules

- Use the exact product definition in public descriptions: `EQIQs™ is a 21-framework personality and compatibility assessment for coaching, communication and team development.`
- Describe the server as decision support for consented coaching, communication, onboarding, and team-development use cases.
- Do not claim that every framework or output has scientific support, is licensed, predicts job performance, or is suitable for employment selection.
- Link to the public methodology and Responsible Use policy wherever a directory supports documentation links.
- Preserve the MCP Registry manifest `name` unless an explicit registry migration is planned; it is the stable registry identity.

## Test before release

```bash
node --check bin/eqiqs-mcp-server.mjs
node bin/eqiqs-mcp-server.mjs --help
node bin/eqiqs-mcp-server.mjs --url
npm pack --dry-run
```
