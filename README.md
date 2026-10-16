# Learning Playwright Fundamentals 3x

Hands-on Playwright test automation fundamentals — a companion project to [Learning Playwright 3X](https://github.com/SandeepG-QA/LearningPlayWright3X) that takes the JavaScript/TypeScript basics and applies them to real browser automation with [`@playwright/test`](https://playwright.dev/).

Tests are organized as a progressive learning path under `tests/`, numbered from the basics through test annotations, locator commands, session storage, Allure reporting, multiple-element filtering, web tables, web selects and custom dropdowns, and frames/iframes, plus a `tests/Practice_Test/` folder for full end-to-end practice flows.

## Project Structure

| Folder / File | What it covers |
|---------------|----------------|
| `tests/01_Basics/` | Launching browsers, contexts, and pages; writing your first specs; running tests against multiple users and with custom context options |
| `tests/02_TestAnnotations/` | Annotating and grouping tests — `skip`, `only`, `fail`, `fixme`, `slow`, and `describe` blocks |
| `tests/03_Locator_Commands/` | Locator commands, CSS selectors, and element interaction practice — navigating with options, filling the VWO login form, locating elements by role and accessible name, and setting a page/context referer |
| `tests/04_Session_Storage/` | Reusing an authenticated session — saving the browser `storageState` to `user-session.json` and loading it so specs land on the dashboard without logging in |
| `tests/05_Allure_Report/` | Allure reporting — the session-reuse dashboard tests run with the Allure reporter, plus a per-test screenshot attachment and video capture |
| `tests/06_Multiple_Element_Filter/` | Handling multiple matching elements — reading all link texts with `allInnerTexts()`, iterating real locators with `.all()`, and clicking one by its text |
| `tests/07_WebTables/` | Web table automation — dynamic XPath row/column loops against `awesomeqa.com`, CSS-based row iteration, filtering many matches with `.filter({ hasText })`, CSS `:has()` row selection, and paging through a table with its Next button |
| `tests/08_web_Select_Frames_Iframes/` | Web select dropdowns — selecting an option from a native `<select>`, plus standard and advanced custom dropdown components (trigger-based, searchable, multi, creatable, and async selects) |
| `tests/09_Frame_Iframe/` | Frames and iframes — reading and filling a form inside an iframe, working with several named frames on one page, and chaining nested iframes |
| `tests/Practice_Test/` | End-to-end practice flows — logging into the CURA healthcare demo app, signing into The Testing Academy app with XPath locators, validating the VWO/Wingify free-trial email error, automating a web table, scraping Flipkart search results across pages, running a create/search/delete employee flow on OrangeHRM, and filling out a validated QA profile form |

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
| `getbyrole.spec.ts` | `getByRole` practice for **text inputs** against the Wingify/VWO login page (`https://app.wingify.com/#/login`) — locates the email and password boxes with `getByRole("textbox", { name: "email" })` and `getByRole("textbox", { name: "password" })`, fills `admin@vwo.com` / `1234`, then pauses with `page.pause()` to inspect the locators |
| `getbyrole1.spec.ts` | `getByRole` practice for a **link** against the Katalon CURA demo app (`https://katalon-demo-cura.herokuapp.com/`) — clicks the "Make Appointment" link located with `getByRole("link", { name: "Make Appointment", exact: true })`, then pauses with `page.pause()` |

### `tests/04_Session_Storage/`

Session reuse — log in once, save the browser state, and skip the login UI in later runs.

| File | What it covers |
|------|----------------|
| `SessionStorage.ts` | Standalone raw-library script (not a spec) — reads the Wingify/VWO credentials from `.env` via `dotenv`, logs in at `https://app.wingify.com/#/login` (`#login-username`, `#login-password`, `#js-login-btn`), waits for the dashboard URL, and persists the authenticated state with `context.storageState({ path: "./user-session.json" })` |
| `TestWingify.spec.ts` | Three dashboard specs that call `test.use({ storageState: './user-session.json', screenshot: 'only-on-failure' })` — each navigates straight to `https://app.wingify.com/#/dashboard?accountId=1284557`, asserts the URL matches `/dashboard/`, and logs "Dashboard loaded - no login needed". Demonstrates that a saved session lets tests start already authenticated |

Run this folder (requires `user-session.json` to exist, generated by `SessionStorage.ts`):

```bash
npx playwright test tests/04_Session_Storage
```

### `tests/05_Allure_Report/`

The same session-reuse dashboard tests, now instrumented for reporting.

| File | What it covers |
|------|----------------|
| `TestWingify1.spec.ts` | Baseline Allure run — identical storage-state dashboard specs (three tests hitting `/dashboard?accountId=1284557`), used to feed the Allure reporter with results |
| `TestWingify2.spec.ts` | Adds reporting artifacts on top of the baseline — `video: 'on'` in `test.use(...)` and a `test.afterEach` hook that attaches the final page as a `dashboard-screenshot` PNG via `testInfo.attach(...)`, so screenshots and video show up as test attachments in the Allure report |

Generate and open the Allure report from these results:

```bash
npx playwright test tests/05_Allure_Report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### `tests/06_Multiple_Element_Filter/`

Locating and filtering when a selector matches many elements, against The Testing Academy multi-element filter page (`https://app.thetestingacademy.com/playwright/multiple_element_filter`).

| File | What it covers |
|------|----------------|
| `ME.spec.ts` | Reads every link's text at once with `page.locator('a.list-group-item').allInnerTexts()`, logs the count and each text, then loops the texts and clicks the element whose text equals `"Forgotten Password"` using `page.getByText(linkText).first().click()`. Also fetches the real locators with `.all()` and logs each `href` via `getAttribute('href')` |
| `ME1.spec.ts` | The `.all()`-only variant — resolves `a.list-group-item` into an array of `Locator` objects, logs how many there are, and iterates them logging each link's `href` attribute |

### `tests/07_WebTables/`

Reading, filtering, and paging through data in HTML tables.

| File | What it covers |
|------|----------------|
| `webTables.spec.ts` | Dynamic XPath practice against `https://awesomeqa.com/webtable.html` — counts rows and columns with `locator(...).count()`, then builds cell paths at runtime (`//table[@id='customers']/tbody/tr[i]/td[j]`) in nested `for` loops. When a cell contains `"Helen Bennett"` it reads the neighbouring cell with the `following-sibling::td` axis and logs her country |
| `webTables1.spec.ts` | CSS-based table iteration against `https://awesomeqa.com/webtable1.html` — selects every row with `table[summary="Sample Table"] tbody tr`, counts them, and for each row reads all cell texts with `rows.nth(i).locator('td').allInnerTexts()`, logging each row's data |
| `webTables2.spec.ts` | Filtering many matches down to one with `.filter({ hasText })` against The Testing Academy multi-element page — clicks the `Forgotten Password` link out of all `a.list-group-item` rows, then asserts the footer `Privacy` link's `href` is `#privacy-policy` with `toHaveAttribute` |
| `webTables3.spec.ts` | Selecting a table row by its text with **CSS instead of XPath** against The Testing Academy web table — clicks the first cell of the row containing `Rohan.Mehta` using the `tr:has(td:text('Rohan.Mehta'))` selector (the commented-out XPath `preceding-sibling::td/input` alternative is included for comparison), then waits a fixed 5s |
| `webTable_Pagination.spec.ts` | Paging through The Testing Academy employee table (`https://app.thetestingacademy.com/playwright/tables/webtable`) to find a row that is not on the first page — loops on the `#employees-tbody tr` row filtered by `hasText` for `"Luca Greco"`, clicks `getByTestId('next-page')` while the row isn't visible, throws if the Next button becomes `isDisabled()`, then reads the found row's `td[data-col="email"]` and `td[data-col="country"]` cells |
| `webTable_Pagination1.spec.ts` | The refactored pagination search — extracts the same `while` loop into a reusable `findRowByName(page, name): Promise<Locator>` helper that returns the located row, so the test simply calls it and reads the email/country cells |

### `tests/08_web_Select_Frames_Iframes/`

Web select (dropdown) practice — the native HTML `<select>` control plus the custom dropdown widgets you meet in modern apps (which are built from `<div>`s, not `<select>`, so they need clicking rather than `selectOption()`).

| File | What it covers |
|------|----------------|
| `Select_TestCase.spec.ts` | Verifies a `<select>` dropdown on the-internet demo page (`https://the-internet.herokuapp.com/dropdown`) — clicks the `#dropdown`, picks `"Option 2"` with `page.selectOption()`, then pauses with `page.pause()` |
| `Custom_Dropdown_Select_TestCase.spec.ts` | Custom (non-`<select>`) dropdowns against The Testing Academy dropdowns page (`https://app.thetestingacademy.com/playwright/tables/dropdowns`) — opens each trigger by its test id (`getByTestId('lang-trigger')`, `framework-trigger`, `experience-trigger`) and selects an option by role or text (`getByRole('option', { name: 'JavaScript' })`, `getByText('Angular').first()`, `getByText('Junior (0-3 years)').first()`), then pauses |
| `Advance_Custome_Dropdown_Select.spec.ts` | The advanced dropdown components on The Testing Academy select-boxes page (`https://app.thetestingacademy.com/playwright/tables/select-boxes`) — a **single searchable** select (`#rs-single` → `Cypress`), a **multi searchable** select (`#rs-multi` → `Pytest` + `JUnit`, closed with `page.keyboard.press('Escape')`), a **creatable multi** select (`#rs-creatable` → `api-testing` + `performance`), and an **async** select that fetches options as you type (`#rs-async`, types `"de"`, asserts the `rs-async-menu` satisfies `toContainText('Delhi')`, then clicks the `Delhi` option by role) before pausing |

### `tests/09_Frame_Iframe/`

Working with frames and iframes — Playwright steps into them with `page.frameLocator()` and chains frame locators to reach nesting.

| File | What it covers |
|------|----------------|
| `iFrame_TestCase.spec.ts` | Filling a form **inside a single iframe** on The Testing Academy frames page (`https://app.thetestingacademy.com/playwright/frames/`) — types a reusable `FrameLocator` from `page.frameLocator('#frame-one')`, then fills the vehicle registration fields through it (`#RESULT_TextField-1/2/3`, picks a body type with `selectOption('Sedan')`, `#RESULT_TextField-4`, `#RESULT_TextArea-1`), clicks `Submit registration`, reads the result back with `#vehicle-output` `innerText()`, and pauses |
| `multi_iFrame_TestCase.spec.ts` | Several frames on one page (`https://app.thetestingacademy.com/playwright/frames/multi-frames`) — reads a heading through the `main` frame (`page.frameLocator('[name="main"]')`), lists every frame with `page.locator('//frame').all()` and logs each frame's `name` and `src` attributes in a loop, then clicks a link inside the `side` frame via `getByTestId('side-link-registration')` before pausing |
| `nested_iFrame_TestCase.spec.ts` | Chaining **nested iframes** on the SelectorsHub scenario page (`https://selectorshub.com/iframe-scenario`) — counts the outer `#pact1` iframe, then nests locators three levels deep (`frame1 = page.frameLocator('#pact1')` → `frame2 = frame1.frameLocator('#pact2')` → `frame3 = frame2.frameLocator('#pact3')`) and fills one field at each level (`#inp_val` → `Aishwarya Rai`, `#jex` → `Wife`, `#glaf` → `Playwright`) before pausing |

Run this folder:

```bash
npx playwright test tests/09_Frame_Iframe
```

### `tests/Practice_Test/`

| File | What it covers |
|------|----------------|
| `test.spec.ts` | An end-to-end practice flow against the Katalon CURA healthcare demo app (`https://katalon-demo-cura.herokuapp.com/`) — clicks the `#btn-make-appointment` link, fills the login form by id (`#txt-username` → `John Doe`, `#txt-password` → `ThisIsNotAPassword`), submits with `#btn-login`, and asserts the `h2` heading reads `Make Appointment` with `toHaveText`, before pausing with `page.waitForTimeout(3000)` |
| `apptesting.spec.ts` | "TC # 01 - Student login on app testing academy" — a login flow on The Testing Academy practice app that exercises **XPath locators** instead of CSS: navigates to `https://app.thetestingacademy.com/playwright/multiple_element_filter`, fills the Email Address (`//input[@id='email']`) and Password (`//input[@id='password']`) fields, ticks the `//input[@type='checkbox']` consent box, clicks the `//button[@class='login-btn']` submit button, and asserts the resulting URL (including the reflected `email`, `password`, and `remember=yes` query parameters and the `#login-success` fragment) with `expect(page).toHaveURL(...)` |
| `wingify.spec.ts` | "TC # 01 - verify the error message in free trail" — invalid-input validation on the VWO/Wingify free-trial page (`https://wingify.com/free-trial/`) — locates the email field with the `data-qa` attribute `[data-qa='page-su-step1-v1-email']`, fills an invalid value, accepts the marketing and GDPR consent checkboxes, clicks the `[data-qa='page-su-submit']` submit button, then reads the `.first()` `invalid-reason` element's `textContent()` and asserts with `toContain` that it holds `"The email address you entered is incorrect."` before pausing with `page.pause()` |
| `webTableAutomate.spec.ts` | "Automate Web Table" against The Testing Academy web table (`https://app.thetestingacademy.com/playwright/webtable`) — counts rows and columns of `//tbody[@id='employee-body']/tr`, then loops building each cell's XPath dynamically (`//tbody[@id='employee-body']/tr[i]/td[j]`). When a cell contains `"Rohan.Mehta"` it ticks that row's checkbox with the `preceding-sibling::td/input[@type='checkbox']` axis and `check()`, before pausing with `page.pause()` |
| `FlipkartAutomate.spec.ts` | "Automate Flipkart" — a real e-commerce scrape: dismisses the login modal with `getByRole('button', { name: '✕' })`, searches the `input[name='q']` box for `"DSLR Camera"`, presses `Enter`, asserts the resulting search URL with `toHaveURL`, then pages through the results while the `Next` link stays enabled — logging each product name (`div.RG5Slk`) and price (`div.hZ3P6w.DeU9vF`) |
| `OrangeOHRM.spec.ts` | "OrangeHRM Test" — a full **create → search → delete** employee flow on the OrangeHRM open-source demo: logs in as `Admin`/`admin123` via `getByRole`, adds an employee (first/last name plus an Employee Id located with the `//label[text()="Employee Id"]/following::input` axis), asserts the `Successfully Saved` toast, searches that employee back up by id, selects its row checkbox (`//i[...oxd-checkbox-input-icon]`), deletes via `Delete Selected` → `Yes, Delete`, and asserts `Successfully Deleted` |
| `qaProfileForm.spec.ts` | "QA Profile form" — fills out a longer profile form on The Testing Academy practice page (`https://app.thetestingacademy.com/playwright/tables/practice#page`) — enters the first/last name by test id (`first-name`, `last-name`), picks a gender (`gender-male`), chooses years of experience (`years-experience` test-id click plus `selectOption('#years-experience', '2')`), fills the date via `getByRole('textbox', { name: 'date' })`, picks a profession (`profession-automation`), ticks the "Selenium Webdriver" checkbox by role, chooses a continent (`continent-asia`), switches a tab (`tab-navigation`), and clicks `Save profile` — then asserts the `#submission-output` block is visible and that its JSON contains `"firstName": "aman"` before pausing |

Run just the practice specs (the whole folder, all seven files):

```bash
npx playwright test tests/Practice_Test
```

### Project Files

| File | What it covers |
|------|----------------|
| `abc.png` | Screenshot of The Testing Academy homepage captured while working through the practice login flow |
| `Utils/CustomReporter.ts` | The custom TTA (The Testing Academy) HTML reporter — a real-time `Reporter` implementation that writes a self-refreshing report to `tta-report/report_<runId>.html` (see Reporting below) |
| `template/template.spec.ts` | A starter spec scaffold — imports `test`/`expect`/`Locator`, opens a page and calls `page.pause()`, ready to be copied when beginning a new test |
| `.envexample` | Template for the local environment file — lists the credential keys the session-storage script expects: `VWO_USER` and `VWO_PASS`. Copy it to `.env` and fill in real values (`.env` itself is gitignored) |
| `.env` (local, not committed) | Real credentials consumed by `tests/04_Session_Storage/SessionStorage.ts` via `dotenv` |
| `user-session.json` | Generated auth state written by `SessionStorage.ts` (`storageState`) and consumed by the session-reuse specs. Not committed — it contains live session cookies |
| `allure-results/` | Generated raw Allure results, written by the `allure-playwright` reporter on each run. Not committed |
| `allure-report/` | Generated Allure HTML report (created by `allure generate`). Not committed |
| `tta-report/` | Generated output of `Utils/CustomReporter.ts` — timestamped HTML reports, history page, and captured screenshots/videos/traces. Not committed |
| `playwright.config.ts` | Test runner configuration (see below) |
| `package.json` | Project metadata, scripts, and dependencies — dev: `@playwright/test`, `@types/node`, `allure-playwright`; runtime: `allure-commandline`, `dotenv` |
| `.gitignore` | Excludes `node_modules/`, `test-results/`, `playwright-report/`, Playwright cache/auth folders, `.env`, and the generated `user-session.json` / `allure-results/` / `tta-report/` outputs from version control |

## Specs vs. Standalone Scripts

The `tests/` folder mixes two different styles, and it matters when you run them:

- **Spec files** (`*.spec.ts`) are Playwright Test files — they import `test`/`expect` from `@playwright/test` and are discovered and executed by the test runner (`npx playwright test`).
- **Standalone scripts** (`normal_pw.ts`, `multiple_context.ts`, `BCP.spec.ts`, and `04_Session_Storage/SessionStorage.ts`) use the raw Playwright library directly. They are *not* picked up by `npx playwright test`, because the runner only matches spec files by default. They do their work at the top level (calling `run()` / `multiUserTest()` / `saveSession()` on load) and are meant to be executed directly with a TypeScript-capable Node runtime.

> Note: `BCP.spec.ts` carries the `.spec.ts` extension but is written as a raw script. It is excluded from the default `npx playwright test` run via the config's `testIgnore`, so it can be executed standalone without the runner picking it up.

Both standalone scripts launch a visible browser (`headless: false`) and clean up after themselves:

- `normal_pw.ts` and `BCP.spec.ts` close the page, then the context, then the browser — the recommended reverse order.
- `multiple_context.ts` is browser-first rather than page-first: one browser, two contexts, two pages, a `console.log` after each navigation to show both users are on the page simultaneously.
- `SessionStorage.ts` saves the storage state first, then closes the browser (the context and page are torn down with it).

## Test Configuration

Defined in `playwright.config.ts`:

- `testDir: './tests'` — every spec file lives in `tests/` (including the numbered subfolders)
- `testIgnore: ['**/BCP.spec.ts']` — keeps the raw standalone script out of the test run even though it has a `.spec.ts` extension
- `fullyParallel: true` — specs execute in parallel locally
- CI-only safeguards — `forbidOnly: !!process.env.CI`, `retries: 2`, and `workers: 1` when `CI` is set
- `reporter: [["line"], ["allure-playwright"], ["./Utils/CustomReporter.ts"]]` — three reporters run together: the concise `line` output in the terminal, `allure-playwright` results written to `allure-results/`, and the custom TTA HTML reporter (`Utils/CustomReporter.ts`) that writes to `tta-report/`
- `trace: 'on-first-retry'` — traces are collected so failing retries can be debugged in the trace viewer
- `headless: false` — the browser window stays visible while learning
- A single `chromium` project using the built-in `Desktop Chrome` device profile (Edge, Chrome, and mobile viewports are present but commented out)

## Reporting

Every run produces three outputs side by side:

- **Terminal (`line`)** — the compact one-line-per-test progress in the console.
- **Allure** — `allure-playwright` writes raw results to `allure-results/`. Turn them into a browsable report with the `allure-commandline` package:

  ```bash
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```

- **TTA HTML reporter (`Utils/CustomReporter.ts`)** — a custom `Reporter` that renders a self-refreshing HTML report at `tta-report/report_<runId>.html` (with `tta-report/index.html` always redirecting to the latest run, plus a `history.html`). It captures screenshots, videos, and traces as attachments, groups tests by file/`describe`, and has tabs for test results, AI data, AI verdicts, flakiness, and self-heal suggestions. The AI tabs are optional and simply stay empty when the optional `../ai/agents/*` modules or an LLM API key are absent.

To attach a screenshot (and video) to a test so it appears in the reports, see `tests/05_Allure_Report/TestWingify2.spec.ts` — it enables `video: 'on'` and uses `testInfo.attach('dashboard-screenshot', ...)` in `test.afterEach`.

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

Run a single folder (e.g. the basics, or any of the later learning folders):

```bash
npx playwright test tests/01_Basics
npx playwright test tests/04_Session_Storage
npx playwright test tests/06_Multiple_Element_Filter
npx playwright test tests/07_WebTables
npx playwright test tests/08_web_Select_Frames_Iframes
npx playwright test tests/09_Frame_Iframe
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

Open a report from the last run — the custom TTA report (see the Reporting section for the Allure flow):

```bash
start tta-report/index.html   # Windows
open tta-report/index.html    # macOS
```

### Run a Standalone Script

These bypass the test runner and drive the browser themselves with the raw Playwright API:

```bash
node tests/01_Basics/normal_pw.ts
node tests/01_Basics/multiple_context.ts
node tests/01_Basics/BCP.spec.ts
node tests/04_Session_Storage/SessionStorage.ts
```

`SessionStorage.ts` reads `VWO_USER` / `VWO_PASS` from a local `.env` file (copy `.envexample` to `.env` and fill it in first) and writes the authenticated `user-session.json` that the session-reuse specs depend on.

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
| Locating textboxes and links by role and accessible name | `tests/03_Locator_Commands/getbyrole.spec.ts` (`getByRole("textbox", { name })`), `tests/03_Locator_Commands/getbyrole1.spec.ts` (`getByRole("link", { name, exact: true })`) |
| Asserting on page title | `tests/01_Basics/example.spec.ts` (`toHaveTitle`) |
| Test annotations (`skip`, `only`, `fail`, `fixme`, `slow`) | `tests/02_TestAnnotations/TestAnnotation.spec.ts` |
| Grouping tests with `describe` | `tests/02_TestAnnotations/TestDescribe.spec.ts` |
| Navigation options (`waitUntil`, `timeout`, `referer`) | `tests/03_Locator_Commands/LC.spec.ts`, `tests/03_Locator_Commands/Fresh.spec.ts` |
| Locator commands | `tests/03_Locator_Commands/LC.spec.ts` |
| CSS selectors by id and filling form fields | `tests/03_Locator_Commands/Fresh.spec.ts` (`#login-username`, `#js-login-btn`, `fill`, `click`) |
| Asserting on element text | `tests/03_Locator_Commands/Fresh.spec.ts` (`toContainText`) |
| Referer header per page vs. per context | `tests/03_Locator_Commands/Fresh.spec.ts` (`goto` option), `tests/03_Locator_Commands/Refere.spec.ts` (`extraHTTPHeaders` via `newContext`) |
| Inspecting locators with `page.pause()` | `tests/03_Locator_Commands/Fresh.spec.ts`, `tests/03_Locator_Commands/getbyrole.spec.ts`, `tests/03_Locator_Commands/getbyrole1.spec.ts` |
| End-to-end login flow with CSS id locators | `tests/Practice_Test/test.spec.ts` (`#btn-make-appointment`, `#txt-username`, `#txt-password`, `#btn-login`) |
| Asserting exact element text | `tests/Practice_Test/test.spec.ts` (`toHaveText("Make Appointment")`) |
| Fixed waits with `page.waitForTimeout()` | `tests/Practice_Test/test.spec.ts` |
| Locating elements with XPath | `tests/Practice_Test/apptesting.spec.ts` (`//input[@id='email']`, `//button[@class='login-btn']`) |
| Asserting on the current URL | `tests/Practice_Test/apptesting.spec.ts` (`toHaveURL`) |
| Locating by `data-qa` attributes | `tests/Practice_Test/wingify.spec.ts` (`[data-qa='page-su-step1-v1-email']`) |
| Validating inline error messages | `tests/Practice_Test/wingify.spec.ts` (`textContent`, `toContain`) |
| Automating a web table | `tests/07_WebTables/webTables.spec.ts`, `tests/07_WebTables/webTables1.spec.ts`, `tests/07_WebTables/webTable_Pagination.spec.ts`, `tests/Practice_Test/webTableAutomate.spec.ts` |
| Reading credentials from `.env` with `dotenv` | `tests/04_Session_Storage/SessionStorage.ts` (`dotenv.config()`, `process.env.VWO_USER`) |
| Reusing an authenticated session | `tests/04_Session_Storage/SessionStorage.ts` (`context.storageState({ path })`), `tests/04_Session_Storage/TestWingify.spec.ts` (`test.use({ storageState })`) |
| Attaching screenshots and recording video | `tests/05_Allure_Report/TestWingify2.spec.ts` (`video: 'on'`, `testInfo.attach` in `test.afterEach`) |
| Generating an Allure report | `tests/05_Allure_Report/`, `allure-playwright` + `allure-commandline` |
| Custom HTML test reporter | `Utils/CustomReporter.ts` (real-time report in `tta-report/`) |
| Reading all matched element texts at once | `tests/06_Multiple_Element_Filter/ME.spec.ts` (`allInnerTexts()`) |
| Iterating multiple resolved locators | `tests/06_Multiple_Element_Filter/ME.spec.ts`, `tests/06_Multiple_Element_Filter/ME1.spec.ts` (`.all()`) |
| Clicking one element out of many by its text | `tests/06_Multiple_Element_Filter/ME.spec.ts` (`getByText(...).first().click()`) |
| Counting rows and columns | `tests/07_WebTables/webTables.spec.ts`, `tests/07_WebTables/webTables1.spec.ts`, `tests/Practice_Test/webTableAutomate.spec.ts` (`count()`) |
| Dynamic XPath built in loops | `tests/07_WebTables/webTables.spec.ts`, `tests/Practice_Test/webTableAutomate.spec.ts` |
| XPath axes (`following-sibling`, `preceding-sibling`, `following`) | `tests/07_WebTables/webTables.spec.ts`, `tests/Practice_Test/webTableAutomate.spec.ts`, `tests/Practice_Test/OrangeOHRM.spec.ts` |
| CSS table iteration with `nth()` | `tests/07_WebTables/webTables1.spec.ts` (`rows.nth(i).locator('td')`) |
| Checking a checkbox | `tests/Practice_Test/webTableAutomate.spec.ts` (`check()`) |
| Filtering a locator by its text | `tests/07_WebTables/webTables2.spec.ts` (`.filter({ hasText })`) |
| Asserting an element attribute | `tests/07_WebTables/webTables2.spec.ts` (`toHaveAttribute`) |
| Selecting a row with CSS `:has()` / `:text()` | `tests/07_WebTables/webTables3.spec.ts` (`tr:has(td:text('Rohan.Mehta'))`) |
| Paging through a table until a row is found | `tests/07_WebTables/webTable_Pagination.spec.ts` (`getByTestId('next-page')`, `isVisible`, `isDisabled`) |
| Extracting a helper that returns a Locator | `tests/07_WebTables/webTable_Pagination1.spec.ts` (`findRowByName(): Promise<Locator>`) |
| Scraping search results across pages | `tests/Practice_Test/FlipkartAutomate.spec.ts` (product/price locators, `Next` link loop) |
| End-to-end create/search/delete flow | `tests/Practice_Test/OrangeOHRM.spec.ts` |
| Filling a multi-field form by test id | `tests/Practice_Test/qaProfileForm.spec.ts` (`getByTestId('first-name')`, `gender-male`, `continent-asia`, `tab-navigation`) |
| Selecting a value from a `<select>` by id | `tests/Practice_Test/qaProfileForm.spec.ts` (`selectOption('#years-experience', '2')`) |
| Ticking a checkbox by role | `tests/Practice_Test/qaProfileForm.spec.ts` (`getByRole('checkbox', { name: 'Selenium Webdriver' })`) |
| Asserting on JSON submission output | `tests/Practice_Test/qaProfileForm.spec.ts` (`textContent()`, `toContain('"firstName": "aman"')`) |
| Asserting dynamic toast messages | `tests/Practice_Test/OrangeOHRM.spec.ts` (`getByText('Successfully Saved')`, `toBeVisible`) |
| Selecting an option from a dropdown | `tests/08_web_Select_Frames_Iframes/Select_TestCase.spec.ts` (`selectOption()`) |
| Selecting an option from a custom (non-`<select>`) dropdown | `tests/08_web_Select_Frames_Iframes/Custom_Dropdown_Select_TestCase.spec.ts` (`getByTestId` trigger + `getByRole('option', { name })` / `getByText().first()`) |
| Searchable, multi, creatable, and async dropdowns | `tests/08_web_Select_Frames_Iframes/Advance_Custome_Dropdown_Select.spec.ts` (multi-select + `Escape`, async menu assertion, type-to-fetch) |
| Working inside an iframe with `frameLocator()` | `tests/09_Frame_Iframe/iFrame_TestCase.spec.ts` |
| Typing a `FrameLocator` and locating elements within a frame | `tests/09_Frame_Iframe/iFrame_TestCase.spec.ts`, `tests/09_Frame_Iframe/multi_iFrame_TestCase.spec.ts` |
| Enumerating frames and reading their attributes | `tests/09_Frame_Iframe/multi_iFrame_TestCase.spec.ts` (`page.locator('//frame').all()`, `getAttribute('name')` / `getAttribute('src')`) |
| Chaining nested frame locators | `tests/09_Frame_Iframe/nested_iFrame_TestCase.spec.ts` |
| Starter spec scaffold | `template/template.spec.ts` |
