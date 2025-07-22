const fs = require("fs")
const path = require("path")

// Path to rammerhead package.json
const rammerheadPackagePath = path.join(__dirname, "lib", "rammerhead", "package.json")

if (fs.existsSync(rammerheadPackagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(rammerheadPackagePath, "utf8"))

  // Replace sqlite3 with better-sqlite3 or remove it
  if (packageJson.dependencies && packageJson.dependencies.sqlite3) {
    console.log("Replacing sqlite3 with better-sqlite3...")
    delete packageJson.dependencies.sqlite3
    packageJson.dependencies["better-sqlite3"] = "^9.2.2"
  }

  // Add install script that ignores sqlite3 compilation
  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts.install = "npm install --no-optional --ignore-scripts"

  fs.writeFileSync(rammerheadPackagePath, JSON.stringify(packageJson, null, 2))
  console.log("Patched rammerhead package.json")
}
