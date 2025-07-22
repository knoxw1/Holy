const { execSync } = require("child_process")
const path = require("path")

console.log("Starting safe build process...")

try {
  // Run main build command
  console.log("Running main build...")
  execSync("node run-command.mjs build", { stdio: "inherit" })

  // Try to build rammerhead
  console.log("Building rammerhead...")
  const rammerheadPath = path.join(__dirname, "lib", "rammerhead")

  try {
    process.chdir(rammerheadPath)

    // Try with production and no optional packages first
    execSync("npm install --production --no-optional --ignore-scripts", { stdio: "inherit" })

    // Try to run build, but don't fail if it doesn't work
    try {
      execSync("npm run build", { stdio: "inherit" })
      console.log("Rammerhead build successful!")
    } catch (buildError) {
      console.warn("Rammerhead build failed, but continuing...")
      console.warn(buildError.message)
    }
  } catch (installError) {
    console.warn("Rammerhead install failed, trying alternative approach...")

    // Try without sqlite3
    try {
      execSync("npm install --production --no-optional --ignore-scripts --omit=optional", { stdio: "inherit" })
      console.log("Rammerhead installed without optional dependencies")
    } catch (altError) {
      console.error("All rammerhead install attempts failed")
      console.error(altError.message)
    }
  }
} catch (error) {
  console.error("Build process failed:", error.message)
  process.exit(1)
}

console.log("Build process completed")
