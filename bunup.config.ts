import fs from "node:fs/promises";
import path from "node:path";
import type { BunupPlugin } from "bunup";
import { defineConfig } from "bunup";
import { copy } from "bunup/plugins";

const entry: string[] = [];
const plugins: BunupPlugin[] = [copy("./README.md")];

async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

const actions: string[] = await fs.readdir("actions");
for (const action of actions) {
  const file: string = path.join("actions", action, "src", "index.ts");
  if (await exists(file)) entry.push(file);
}
for (const action of actions) {
  const sources: string[] = [];
  for (const child of await fs.readdir(path.join("actions", action))) {
    if (child === "src") continue;
    sources.push(path.join("actions", action, child));
  }
  if (sources.length > 0) plugins.push(copy(sources).to(action));
}

export default defineConfig({
  entry,
  format: ["esm"],
  minify: true,
  splitting: false,
  dts: false,
  packages: "bundle",
  target: "node",
  sourcemap: "inline",
  sourceBase: "actions",
  plugins,
  shims: true,
  exports: false,
  unused: true,
});
