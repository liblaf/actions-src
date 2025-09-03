import fs from "node:fs/promises";
import path from "node:path";
import type { BuildOptions, BunupPlugin } from "bunup";
import { defineConfig } from "bunup";
import { copy, shims, unused } from "bunup/plugins";

const entry: string[] = [];
const plugins: BunupPlugin[] = [];

const actions: string[] = await fs.readdir("actions");
for (const action of actions) {
  const file: string = path.join("actions", action, "src", "index.ts");
  if (await fs.exists(file)) entry.push(file);
}
for (const action of actions) {
  const sources: string[] = [];
  for (const child of await fs.readdir(path.join("actions", action))) {
    if (child === "src") continue;
    sources.push(path.join("actions", action, child));
  }
  if (sources.length > 0)
    plugins.push(copy(sources, path.join("dist", action)));
}

export default defineConfig({
  entry: entry,
  format: ["esm"],
  minify: true,
  splitting: false,
  dts: false,
  target: "node",
  sourcemap: "inline",
  async onSuccess(_options: Partial<BuildOptions>): Promise<void> {
    for (const action of actions) {
      if (await fs.exists(path.join("dist", action, "src"))) {
        await fs.rename(
          path.join("dist", action, "src"),
          path.join("dist", action, "dist"),
        );
      }
    }
  },
  plugins: [shims(), ...plugins, unused()],
});
