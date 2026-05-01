const fs = require("fs");
const path = require("path");

const MODEL_DIR = path.resolve(__dirname, "../src/model");

const BANNER = `/* istanbul ignore file */

/**
 * AUTO-GENERATED — DO NOT EDIT
 * Run \`npm run generate:model-barrel\` to regenerate
 */`;

function generateBarrelForDir(dir) {
  if (!fs.existsSync(dir)) return;

  const exports = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts",
    )
    .map((e) => `export * from "./${path.basename(e.name, ".ts")}";`);

  const content = [BANNER, "", ...exports].join("\n") + "\n";
  const output = path.join(dir, "index.ts");
  fs.writeFileSync(output, content, "utf8");
  console.log(`Barrel file written to: ${output}`);
}

function generate() {
  generateBarrelForDir(MODEL_DIR);

  const subdirs = fs
    .readdirSync(MODEL_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(MODEL_DIR, e.name));

  for (const sub of subdirs) {
    generateBarrelForDir(sub);
  }
}

generate();
