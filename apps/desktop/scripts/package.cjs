/**
 * Package the Electrobun build output into a distributable archive.
 * Run after `npx electrobun build`.
 *
 * Usage: node scripts/package.js
 * Output: artifacts/ExcaliMath-win-x64.zip (or .tar.gz on mac/linux)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const artifactDir = path.join(__dirname, "..", "artifacts");

// Find the build output directory
const builds = fs.readdirSync(buildDir).filter((d) => {
  return fs.statSync(path.join(buildDir, d)).isDirectory();
});

if (builds.length === 0) {
  console.error("No build output found. Run 'npx electrobun build' first.");
  process.exit(1);
}

const latestBuild = builds[builds.length - 1];
const appDir = fs.readdirSync(path.join(buildDir, latestBuild)).find((d) =>
  d.startsWith("ExcaliMath")
);

if (!appDir) {
  console.error("No ExcaliMath app found in build output.");
  process.exit(1);
}

// Create artifacts directory
fs.mkdirSync(artifactDir, { recursive: true });

const platform = process.platform === "win32" ? "win" : process.platform === "darwin" ? "mac" : "linux";
const arch = process.arch;
const version = require("../package.json").version;
const archiveName = `ExcaliMath-v${version}-${platform}-${arch}`;
const sourcePath = path.join(buildDir, latestBuild, appDir);

const outFile = path.join(artifactDir, `${archiveName}.zip`);

if (process.platform === "win32") {
  // Use PowerShell Compress-Archive on Windows
  const psSource = sourcePath.replace(/\\/g, "\\\\");
  const psOut = outFile.replace(/\\/g, "\\\\");
  // Remove old archive if exists
  if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${psSource}\\*' -DestinationPath '${psOut}'"`,
    { stdio: "inherit" }
  );
} else {
  execSync(`cd "${sourcePath}" && zip -r "${outFile}" .`, { stdio: "inherit" });
}

console.log(`\nPackage created: ${outFile}`);
console.log(`Size: ${(fs.statSync(outFile).size / 1024 / 1024).toFixed(1)} MB`);
console.log(`\nTo distribute: share the zip. Users unzip and run bin/launcher.exe`);
