#!/usr/bin/env tsx
/** @file Script generate new version number. */
import { type ExecSyncOptions, execSync } from "node:child_process"
import { readFileSync } from "node:fs"
import chalk from "chalk"

const { italic, blue, green, red } = chalk

// --- Config ---

// Repo ID for tea-cli command
const repo = "la-construction"
// Login for tea-cli
const login = "10linux01.pbt.local"
// Time to sleep before creating release
const sleepTime = 2000

// --- Types ---

/** Package.json file represented as an object. */
interface PackageJson {
  [key: string]: unknown
  version?: string
}

// --- Helpers ---

/**
 * Delays execution by ms.
 * @param ms - Milliseconds to sleep.
 * @returns Void.
 */
const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

/**
 * Prints a message to console.
 * @param msg - Message to print.
 * @param color - Optional color function from chalk.
 */
const print = (msg: string, color = blue): void => {
  console.info(color(`\n${msg}`))
}

/**
 * Runs a command using execSync().
 * @param cmd - Command to run.
 * @param opts - Options to pass to execSync().
 */
const run = (cmd: string, opts?: ExecSyncOptions): void => {
  try {
    execSync(cmd, opts ?? { stdio: "inherit" })
  } catch (err) {
    const error = err as { stderr?: Buffer; message?: string }
    const stderr = error.stderr?.toString() ?? error.message ?? "Unknown error"
    // Print error to console
    console.error(red(stderr))
    // Exit app
    process.exit(1)
  }
}

/**
 * Gets new revision number based on current version / date.
 * @param current - Current version in YYYY.MM.rev format.
 * @param newYear - New year for version.
 * @param newMonth - New month for version.
 * @returns New revision number.
 */
const getRev = (current: string, newYear: number, newMonth: number): number => {
  // Read current version from package.json
  const [curYear, curMonth, curRev] = current.split(".")

  // If same year and month, increment revision, else reset to 0
  return `${curYear}.${curMonth}` === `${newYear}.${newMonth}`
    ? Number.parseInt(curRev || "0") + 1
    : 0
}

/**
 * Generates new version in YYYY.MM.rev format.
 * @param current - Current version in YYYY.MM.rev format.
 * @returns - Generated version.
 */
const generateVersion = (current: string): string => {
  const now = new Date()
  const newYear = now.getFullYear()
  const newMonth = now.getMonth() + 1 // Months are zero-based
  const rev = getRev(current, newYear, newMonth)
  // Return new version string
  return `${String(newYear)}.${String(newMonth)}.${String(rev)}`
}

/**
 * Updates all workspace package.json files with new version using `npm version`.
 * @param newVersion - New release version.
 */
const updateVersion = (newVersion: string): void => {
  print(`Updating version to ${newVersion}…`)
  run(
    `npm version ${newVersion} --workspaces --no-git-tag-version && npm version ${newVersion} --no-git-tag-version`
  )
}

// --- Main Code ---

// Parse top-level package.json file into object
const rootPkg = JSON.parse(
  readFileSync("./package.json", "utf8")
) as PackageJson

// Print new version number in YYYY.MM.rev format to console
const newVersion = generateVersion(rootPkg.version ?? "0.0.0")

// Git tag for new version
const newTag = `v${newVersion}`

// Update version in package.json files
updateVersion(newVersion)

// Add updated package.json files and create commit
print('Adding package.json files and creating "chore(release):" commit…')
run(`git add . && git commit -m "chore(release): ${newTag}"`)

// Update CHANGELOG.md and format with prettier
print("Updating CHANGELOG.md and adding to previous commit…")
run("auto-changelog -p --unreleased && prettier CHANGELOG.md -w")

// Add CHANGELOG.md to previous commit
print("Adding CHANGELOG.md to previous commit…")
run("git add CHANGELOG.md && git commit --amend --no-edit")

// Generate release notes
print("Generating CHANGELOG.tmp for release notes…")
run(
  "auto-changelog -p --unreleased-only --template=./scripts/changelog-templates/release.hbs --output CHANGELOG.tmp"
)

// Push commits to remote
print("Pushing commits to remote…")
run(`git push`)

// Add version tag
print(`Adding local ${newTag} tag…`)
run(`git tag ${newTag}`)

// Push tags to remote
print("Pushing tags to remote…")
run(`git push origin --tags`)

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
print(`\nWaiting ${sleepTime / 1000}s…\n`, italic)
await sleep(sleepTime)

// Create new release
print(`Creating ${newTag} release…`)
run(
  `tea-cli release create --title ${newTag} --tag=${newTag} --note "$(cat CHANGELOG.tmp)" --login ${login} --repo ${repo}`
)

// Cleanup
print("Cleaning up temporary files…")
run("rm CHANGELOG.tmp", { stdio: "pipe" })

print("Done!", green)
