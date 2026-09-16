# Learning Playwright Fundamentals 3x

Hands-on Playwright test automation fundamentals — a companion project to [Learning Playwright 3X](https://github.com/SandeepG-QA/LearningPlayWright3X) that takes the JavaScript/TypeScript basics and applies them to real browser automation with [`@playwright/test`](https://playwright.dev/).

## Project Structure

| File | What it covers |
|------|----------------|
| `tests/example.spec.ts` | Scaffold smoke tests against playwright.dev — asserts the page title with `toHaveTitle(/Playwright/)`, then clicks the "Get started" link and asserts the Installation heading is visible |
| `tests/tta-check.spec.ts` | Login flow against The Testing Academy practice app (`https://app.thetestingacademy.com/playwright/multiple_element_filter`) — fills the Email Address and Password fields located with `getByRole`, then submits via `getByTestId('login-button')` |
| `playwright.config.ts` | Test runner configuration (see below) |
| `package.json` | Project metadata and dev dependencies — `@playwright/test` and `@types/node` |
| `.gitignore` | Excludes `node_modules/`, `test-results/`, `playwright-report/`, and Playwright cache/auth folders from version control |

## Test Configuration

Defined in `playwright.config.ts`:

- `testDir: './tests'` — every spec file lives in `tests/`
- `fullyParallel: true` — specs execute in parallel locally
- CI-only safeguards — `forbidOnly: !!process.env.CI`, `retries: 2`, and `workers: 1` when `CI` is set
- `reporter: 'html'` — an HTML report is generated in `playwright-report/`
- `trace: 'on-first-retry'` — traces are collected so failing retries can be debugged in the trace viewer
- `headless: false` — the browser window stays visible while learning
- A single `chromium` project using the built-in `Desktop Chrome` device profile (Edge, Chrome, and mobile viewports are present but commented out)

## Getting Started

### Prerequisites

- Node.js installed on your system
- A code editor (VS Code recommended)
- Basic computer literacy

### Install

```bash
npm install
npx playwright install
```

### Run the Tests

Run the whole suite:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/tta-check.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "has title"
```

Open the HTML report from the last run:

```bash
npx playwright show-report
```
