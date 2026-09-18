# Learning Playwright Fundamentals 3x

Hands-on Playwright test automation fundamentals — a companion project to [Learning Playwright 3X](https://github.com/SandeepG-QA/LearningPlayWright3X) that takes the JavaScript/TypeScript basics and applies them to real browser automation with [`@playwright/test`](https://playwright.dev/).

## Project Structure

| File | What it covers |
|------|----------------|
| `tests/example.spec.ts` | Scaffold smoke tests against playwright.dev — `has title` asserts the page title with `toHaveTitle(/Playwright/)`, and `viewer` asserts the full exact title string `"Fast and reliable end-to-end testing for modern web apps \| Playwright"` |
| `tests/tta-check.spec.ts` | Login flow against The Testing Academy practice app (`https://app.thetestingacademy.com/playwright/multiple_element_filter`) — fills the Email Address and Password fields located with `getByRole`, then submits via `getByTestId('login-button')` |
| `tests/multiple_context.ts` | Standalone raw-library script (not a spec) — launches Chromium and opens **two isolated browser contexts**, one labelled Admin and one labelled Viewer, each loading the VWO login page (`https://app.vwo.com/login`), to demonstrate multi-user testing with separate sessions before closing both contexts and the browser |
| `tests/normal_pw.ts` | Standalone raw-library script (not a spec) — the classic `chromium.launch()` → `newContext()` → `newPage()` → `goto("https://google.com")` → print `page.title()` flow, fully typed with `Browser`, `BrowserContext`, and `Page`, followed by cleanup in reverse order |
| `abc.png` | Screenshot of The Testing Academy homepage captured while working through the practice login flow |
| `playwright.config.ts` | Test runner configuration (see below) |
| `package.json` | Project metadata and dev dependencies — `@playwright/test` and `@types/node` |
| `.gitignore` | Excludes `node_modules/`, `test-results/`, `playwright-report/`, and Playwright cache/auth folders from version control |

## Specs vs. Standalone Scripts

The `tests/` folder mixes two different styles, and it matters when you run them:

- **Spec files** (`*.spec.ts`) are Playwright Test files — they import `test`/`expect` from `@playwright/test` and are discovered and executed by the test runner (`npx playwright test`).
- **Standalone scripts** (`normal_pw.ts`, `multiple_context.ts`) use the raw Playwright library directly. They are *not* picked up by `npx playwright test`, because the runner only matches spec files by default. They do their work at the top level (calling `run()` / `multiUserTest()` on load) and are meant to be executed directly with a TypeScript-capable Node runtime.

Both standalone scripts launch a visible browser (`headless: false`) and clean up after themselves:

- `normal_pw.ts` closes the page, then the context, then the browser — the recommended reverse order.
- `multiple_context.ts` is browser-first rather than page-first: one browser, two contexts, two pages, a `console.log` after each navigation to show both users are on the page simultaneously.

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

### Run a Standalone Script

These bypass the test runner and drive the browser themselves with the raw Playwright API:

```bash
node tests/normal_pw.ts
node tests/multiple_context.ts
```

## Concepts Covered

| Concept | Where to look |
|---------|---------------|
| Locating elements by role and test id | `tests/tta-check.spec.ts` (`getByRole`, `getByTestId`) |
| Asserting on page title | `tests/example.spec.ts` (`toHaveTitle`) |
| Launching a browser manually | `tests/normal_pw.ts` (`chromium.launch`) |
| Isolated multi-user sessions | `tests/multiple_context.ts` (`browser.newContext()`) |
| Typed Playwright objects | `tests/normal_pw.ts` (`Browser`, `BrowserContext`, `Page`) |
| Resource cleanup order | `tests/normal_pw.ts`, `tests/multiple_context.ts` |
