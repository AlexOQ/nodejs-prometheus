# Contributing to nodejs-prometheus

Thanks for your interest in contributing!

## Quick Start

```sh
git clone https://github.com/AlexOQ/nodejs-prometheus.git
cd nodejs-prometheus
nvm use
npm install
npm test
```

## Development Setup

- **Node.js 18+** required (see `.nvmrc`)
- Install dependencies: `npm install`
- Run the app locally: `node index.js`
- App runs on `http://localhost:3000`

## Running Tests

```sh
npm test
```

Tests use Jest and Supertest. CI runs tests against Node 18 and 20.

## Project Structure

```
├── index.js          # Main application
├── index.test.js     # Tests
├── helm/             # Kubernetes Helm chart
└── Dockerfile        # Container build
```

## Pull Requests

1. Fork the repo
2. Create a feature branch (`git checkout -b my-feature`)
3. Make your changes
4. Run `npm test`
5. Commit and push
6. Open a PR with a clear description

Keep PRs focused — one feature or fix per PR.

## Reporting Issues

Found a bug? Open an issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce

## Questions?

Open an issue — happy to help.
