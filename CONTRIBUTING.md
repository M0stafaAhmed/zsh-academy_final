# Contributing

Contributions should make the academy technically accurate, easier to learn from, and safer to use.

## Curriculum

- Verify Zsh syntax and behavior against the Zsh manual and current release documentation.
- Separate Zsh-specific features from Bash or POSIX shell behavior.
- Include prerequisites, expected output, and meaningful explanations.
- Make quiz answers unambiguous and add explanations for correct answers.
- Avoid copying copyrighted course material or exam questions.

## Code

- Preserve the dependency-light static architecture unless a build system is justified.
- Keep persisted state versionable and validate data read from browser storage.
- Escape dynamic content before inserting it into HTML.
- Test navigation, quiz scoring, progress persistence, completion gating, and certificate rendering.

## Safety and privacy

- Use example-only targets and credentials.
- Label commands that can modify files, services, permissions, or network state.
- Do not add remote telemetry or collect learner information without clear disclosure and consent.
- Do not commit credentials, private keys, API tokens, or personal learner data.
