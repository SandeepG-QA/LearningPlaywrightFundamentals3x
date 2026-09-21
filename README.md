# Learning Playwright Fundamentals 3x

Hands-on Playwright test automation fundamentals — a companion project to [Learning Playwright 3X](https://github.com/SandeepG-QA/LearningPlayWright3X) that takes the JavaScript/TypeScript basics and applies them to real browser automation with [`@playwright/test`](https://playwright.dev/).

Tests are organized as a progressive learning path under `tests/`, numbered from the basics through test annotations and locator commands, plus a `tests/Practice_Test/` folder for a full end-to-end practice flow.

## Project Structure

| Folder / File | What it covers |
|---------------|----------------|
| `tests/01_Basics/` | Launching browsers, contexts, and pages; writing your first specs; running tests against multiple users and with custom context options |
| `tests/02_TestAnnotations/` | Annotating and grouping tests — `skip`, `only`, `fail`, `fixme`, `slow`, and `describe` blocks |
| `tests/03_Locator_Commands/` | Locator commands, CSS selectors, and element interaction practice — navigating with options, filling the VWO login form, and setting a page/context referer |
| `tests/Practice_Test/` | End-to-end practice flow — logging into the CURA healthcare demo app with CSS id locators and asserting the appointment page heading |

### `tests/01_Basics/`

| File | What it covers |
|------|----------------|
| `example.spec.ts` | Scaffold smoke tests against playwright.dev — `has title` asserts the page title with `toHaveTitle(/Playwright/)`, and `viewer` asserts the full exact title string `"Fast and reliable end-to-end testing for modern web apps \| Playwright"` |
| `tta-check.spec.ts` | Login flow against The Testing Academy practice app (`https://app.thetestingacademy.com/playwright/multiple_element_filter`) — fills the Email Address and Password fields located with `getByRole`, then submits via `getByTestId('login-button')` |
| `TA.spec.ts` | Multi-role browser context work against The Testing Academy — a single-role navigation test, plus a "BCP" test that opens three isolated contexts (admin, user, guest) pointing at thetestingacademy.com, sdet.live, and scrolltest.com respectively |
| `Test.Options.spec.ts` | Creating contexts with explicit options — a desktop context pinning `viewport`, `locale`, `timezoneId`, `geolocation`, and `permissions`, and a "mobile context" that emulates an iPhone via `viewport`, `userAgent`, `deviceScaleFactor`, `isMobile`, and `hasTouch` |
| `BCP.spec.ts` | Standalone raw-library script (not a spec) — the three-level launch flow (`chromium.launch()` → `newContext()` → `newPage()`) with a typed `BrowserContext` and `Page`, logging each object before cleaning up in reverse order |
| `normal_pw.ts` | Standalone raw-library script (not a spec) — the classic `chromium.launch()` → `newContext()` → `newPage()` → `goto("https://google.com")` → print `page.title()` flow, fully typed with `Browser`, `BrowserContext`, and `Page`, followed by cleanup in reverse order |
| `multiple_context.ts` | Standalone raw-library script (not a spec) — launches Chromium and opens **two isolated browser contexts**, one labelled Admin and one labelled Viewer, each loading the VWO login page (`https://app.vwo.com/login`), to demonstrate multi-user testing with separate sessions before closing both contexts and the browser |

### `tests/02_TestAnnotations/`

| File | What it covers |
|------|----------------|
| `TestAnnotation.spec.ts` | The full set of test annotations — `test.skip` (never execute), `test.only` (run just this one), `test.fail` (expected to fail, e.g. `expect(90).toBe(100)`), `test.fixme` (skipped but flagged as needing a fix), and `test.slow()` (triples the default timeout, verified by logging `test.info().timeout`). Also shows a conditional skip, `test.fixme(browserName === 'webkit', ...)`, using the `browserName` fixture |
| `TestDescribe.spec.ts` | Grouping related cases in a `test.describe('Login Page')` block — a "Valid Credentials" test and an "Invalid Password" test that marks itself slow. Run the group by name with `npx playwright test -g "Login Page"` (`-g` matches the group title) |

### `tests/03_Locator_Commands/`

| File | What it covers |
|------|----------------|
| `LC.spec.ts` | Navigation-option practice in a `verify x` spec — `page.goto()` to the The Testing Academy multi-element filter page with `waitUntil: 'commit'`, then a second navigation to `/login` with `waitUntil: 'domcontentloaded'`, an explicit `timeout`, and a `referer` (the `response` is captured from `goto` for later inspection) |
| `Fresh.spec.ts` | CSS-selector locator practice against the VWO login page (`https://app.vwo.com`) — navigates with `waitUntil: 'domcontentloaded'`, a `timeout`, and a `referer: "https://sdet.live"`, then locates the fields by id (`#login-username`, `#login-password`, `#js-login-btn`), fills and submits invalid credentials, asserts the error banner (`#js-notification-box-msg`) with `toContainText`, and pauses with `page.pause()` to inspect locators |
| `Refere.spec.ts` | Setting a **referer for an entire context** — builds a context with `browser.newContext({ extraHTTPHeaders: { "Referer": ... } })` so every request carries the header, then opens one page and visits two sites (VWO login and the Katalon CURA demo app), logging after each navigation |

### `tests/Practice_Test/`

| File | What it covers |
|------|----------------|
| `test.spec.ts` | An end-to-end practice flow against the Katalon CURA healthcare demo app (`https://katalon-demo-cura.herokuapp.com/`) — clicks the `#btn-make-appointment` link, fills the login form by id (`#txt-username` → `John Doe`, `#txt-password` → `ThisIsNotAPassword`), submits with `#btn-login`, and asserts the `h2` heading reads `Make Appointment` with `toHaveText`, before pausing with `page.waitForTimeout(3000)` |

Run just this practice spec:

```bash
npx playwright test tests/Practice_Test
```

### Project Files

| File | What it covers |
|------|----------------|
| `abc.png` | Screenshot of The Testing Academy homepage captured while working through the practice login flow |
| `playwright.config.ts` | Test runner configuration (see below) |
| `package.json` | Project metadata and dev dependencies — `@playwright/test` and `@types/node` |
| `.gitignore` | Excludes `node_modules/`, `test-results/`, `playwright-report/`, and Playwright cache/auth folders from version control |

## Specs vs. Standalone Scripts

The `tests/` folder mixes two different styles, and it matters when you run them:

- **Spec files** (`*.spec.ts`) are Playwright Test files — they import `test`/`expect` from `@playwright/test` and are discovered and executed by the test runner (`npx playwright test`).
- **Standalone scripts** (`normal_pw.ts`, `multiple_context.ts`, `BCP.spec.ts`) use the raw Playwright library directly. They are *not* picked up by `npx playwright test`, because the runner only matches spec files by default. They do their work at the top level (calling `run()` / `multiUserTest()` on load) and are meant to be executed directly with a TypeScript-capable Node runtime.

> Note: `BCP.spec.ts` carries the `.spec.ts` extension but is written as a raw script. It is excluded from the default `npx playwright test` run via the config's `testIgnore`, so it can be executed standalone without the runner picking it up.

Both standalone scripts launch a visible browser (`headless: false`) and clean up after themselves:

- `normal_pw.ts` and `BCP.spec.ts` close the page, then the context, then the browser — the recommended reverse order.
- `multiple_context.ts` is browser-first rather than page-first: one browser, two contexts, two pages, a `console.log` after each navigation to show both users are on the page simultaneously.

## Test Configuration

Defined in `playwright.config.ts`:

- `testDir: './tests'` — every spec file lives in `tests/` (including the numbered subfolders)
- `testIgnore: ['**/BCP.spec.ts']` — keeps the raw standalone script out of the test run even though it has a `.spec.ts` extension
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

Run a single folder (e.g. the basics):

```bash
npx playwright test tests/01_Basics
```

Run a single spec file:

```bash
npx playwright test tests/01_Basics/tta-check.spec.ts
```

Run a single test by name:

```bash
npx playwright test -g "has title"
```

Run a describe group by name (`-g` matches the group title):

```bash
npx playwright test -g "Login Page"
```

Open the HTML report from the last run:

```bash
npx playwright show-report
```

### Run a Standalone Script

These bypass the test runner and drive the browser themselves with the raw Playwright API:

```bash
node tests/01_Basics/normal_pw.ts
node tests/01_Basics/multiple_context.ts
node tests/01_Basics/BCP.spec.ts
```

## Concepts Covered

| Concept | Where to look |
|---------|---------------|
| Launching a browser manually | `tests/01_Basics/normal_pw.ts`, `tests/01_Basics/BCP.spec.ts` (`chromium.launch`) |
| Browser → context → page hierarchy | `tests/01_Basics/BCP.spec.ts` (`newContext`, `newPage`) |
| Typed Playwright objects | `tests/01_Basics/normal_pw.ts` (`Browser`, `BrowserContext`, `Page`) |
| Resource cleanup order | `tests/01_Basics/normal_pw.ts`, `tests/01_Basics/multiple_context.ts`, `tests/01_Basics/BCP.spec.ts` |
| Isolated multi-user sessions | `tests/01_Basics/multiple_context.ts`, `tests/01_Basics/TA.spec.ts` (`browser.newContext()`) |
| Custom context options | `tests/01_Basics/Test.Options.spec.ts` (viewport, locale, timezone, geolocation) |
| Mobile device emulation | `tests/01_Basics/Test.Options.spec.ts` (`isMobile`, `hasTouch`) |
| Locating elements by role and test id | `tests/01_Basics/tta-check.spec.ts` (`getByRole`, `getByTestId`) |
| Asserting on page title | `tests/01_Basics/example.spec.ts` (`toHaveTitle`) |
| Test annotations (`skip`, `only`, `fail`, `fixme`, `slow`) | `tests/02_TestAnnotations/TestAnnotation.spec.ts` |
| Grouping tests with `describe` | `tests/02_TestAnnotations/TestDescribe.spec.ts` |
| Navigation options (`waitUntil`, `timeout`, `referer`) | `tests/03_Locator_Commands/LC.spec.ts`, `tests/03_Locator_Commands/Fresh.spec.ts` |
| Locator commands | `tests/03_Locator_Commands/LC.spec.ts` |
| CSS selectors by id and filling form fields | `tests/03_Locator_Commands/Fresh.spec.ts` (`#login-username`, `#js-login-btn`, `fill`, `click`) |
| Asserting on element text | `tests/03_Locator_Commands/Fresh.spec.ts` (`toContainText`) |
| Referer header per page vs. per context | `tests/03_Locator_Commands/Fresh.spec.ts` (`goto` option), `tests/03_Locator_Commands/Refere.spec.ts` (`extraHTTPHeaders` via `newContext`) |
| Inspecting locators with `page.pause()` | `tests/03_Locator_Commands/Fresh.spec.ts` |
| End-to-end login flow with CSS id locators | `tests/Practice_Test/test.spec.ts` (`#btn-make-appointment`, `#txt-username`, `#txt-password`, `#btn-login`) |
| Asserting exact element text | `tests/Practice_Test/test.spec.ts` (`toHaveText("Make Appointment")`) |
| Fixed waits with `page.waitForTimeout()` | `tests/Practice_Test/test.spec.ts` |
