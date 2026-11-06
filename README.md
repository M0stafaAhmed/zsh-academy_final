# Zsh Mastery Academy

An interactive, browser-based Zsh learning platform that progresses from command-line fundamentals to advanced shell engineering and penetration-testing automation.

This is the maintained, feature-rich academy in the Zsh project family. The earlier [ZSHAcad_v2 curriculum explorer](https://github.com/M0stafaAhmed/ZSHAcad_v2) is preserved separately as a prototype.

## Learning structure

The academy contains seven progressive levels:

0. Terminal Survival
1. Command Fluency
2. Shell Syntax
3. Automation Scripting
4. Advanced Zsh Engineering
5. Pentest Automation
6. Professional Toolkit

Each level contains structured topics, examples, and a level quiz. Learners can mark levels complete after passing the corresponding quiz.

## Features

- Seven progressive learning levels.
- Topic navigation and structured code examples.
- Interactive quizzes with scoring and pass state.
- Completion tracking and progress overview.
- Browser-local persistence for completion state, quiz scores, and certificate name.
- In-app course-completion certificate view.
- Responsive navigation and sidebar controls.

The certificate is an application-generated record of progress in this project. It is **not** an accredited qualification, vendor certification, or proof of independently assessed professional competence.

## Run locally

No package installation or build step is required.

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Data and privacy

The application stores learner progress in browser `localStorage` under the key `zsh-academy-state`. The data stays in the current browser profile; this project does not send progress to a server or synchronize it between devices.

Clearing site data or using a different browser profile can remove or isolate progress. Do not enter sensitive personal information in the certificate-name field.

## Repository layout

```text
.
├── index.html
├── script.js
├── style.css
├── 404.html
├── firebase.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── .gitignore
└── archive/
    ├── README.md
    └── legacy-bundle.html
```

The root `index.html`, `script.js`, and `style.css` are the maintained source application. The archived bundle is retained for historical reference and is excluded from deployment.

## Security and accuracy

This is a learning reference, not an execution environment. Code examples are displayed as text and are not run by the website. Review each command and validate Zsh behavior against the relevant Zsh manual before using it.

Pentesting examples are for systems and networks you own or are explicitly authorized to assess. Commands may change target state, expose information, or affect availability; understand them before execution.

## License

The original application source and authored learning material are licensed under the MIT License. See [LICENSE](./LICENSE). Third-party product names and external documentation remain the property of their respective owners.
