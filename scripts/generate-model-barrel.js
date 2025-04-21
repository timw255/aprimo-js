const fs = require("fs");
const path = require("path");

const MODEL_DIR = path.resolve(__dirname, "../src/model");
const OUTPUT = path.join(MODEL_DIR, "index.ts");

function generate() {
  const files = fs.readdirSync(MODEL_DIR)
    .filter(f => f.endsWith(".ts") && f !== "index.ts");

  const exports = files.map(file => {
    const name = path.basename(file, ".ts");
    return `export * from "./${name}";`;
  });

  const banner = `/**
 * AUTO-GENERATED — DO NOT EDIT
 * Run \`npm run generate:model-barrel\` to regenerate
 */`;

  const content = [banner, "", ...exports].join("\n");

  fs.writeFileSync(OUTPUT, content, "utf8");
  console.log(`Barrel file written to: ${OUTPUT}`);
}

generate();
