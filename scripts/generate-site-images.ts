import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { generatedSiteImageAssets } from "../lib/site-images";

const skillScript = "/Users/chengyadong/clawd/skills/baoyu-skills-new/skills/baoyu-image-gen/scripts/main.ts";
const cwd = process.cwd();
const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyIndex = args.indexOf("--only");
const onlyValue = onlyIndex >= 0 ? args[onlyIndex + 1] : "";

function toPublicPath(src: string) {
  return join(cwd, "public", src.replace(/^\//, ""));
}

const assets = generatedSiteImageAssets.filter((asset) =>
  onlyValue ? asset.id.includes(onlyValue) || asset.src.includes(onlyValue) : true
);

if (!assets.length) {
  console.error(`No assets matched${onlyValue ? ` --only ${onlyValue}` : ""}.`);
  process.exit(1);
}

for (const [index, asset] of assets.entries()) {
  const webpPath = toPublicPath(asset.src);
  const pngPath = webpPath.replace(/\.webp$/i, ".png");

  mkdirSync(dirname(webpPath), { recursive: true });

  if (existsSync(webpPath) && !force) {
    console.log(`[${index + 1}/${assets.length}] skip ${asset.id}`);
    continue;
  }

  console.log(`\n[${index + 1}/${assets.length}] generate ${asset.id}`);
  console.log(` -> ${asset.src}`);

  execFileSync(
    "npx",
    [
      "-y",
      "bun",
      skillScript,
      "--prompt",
      asset.prompt,
      "--image",
      pngPath,
      "--ar",
      asset.aspect,
      "--quality",
      asset.quality,
      "--json"
    ],
    {
      stdio: "inherit",
      cwd
    }
  );

  execFileSync("cwebp", ["-q", "82", pngPath, "-o", webpPath], {
    stdio: "inherit",
    cwd
  });

  if (existsSync(pngPath)) {
    rmSync(pngPath);
  }
}

console.log(`\nGenerated ${assets.length} asset(s).`);
