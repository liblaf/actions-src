import fs from "node:fs/promises";
import path from "node:path";
import { build } from "bunup";

const DIST_DIR: string = "./dist";

async function exists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  for (const action of await fs.readdir("actions")) {
    const folder: string = path.join("actions", action);
    const entry: string = path.join(folder, "src", "index.ts");
    if (await exists(entry)) {
      await build({
        entry: path.join(folder, "src", "index.ts"),
        outDir: path.join(DIST_DIR, action, "dist"),
        format: "esm",
        minify: true,
        splitting: false,
        dts: false,
        packages: "bundle",
        target: "node",
        clean: true,
        sourcemap: true,
        exports: false,
        unused: false,
      });
    }
    for (const child of await fs.readdir(folder)) {
      if (child === "src") continue;
      await fs.cp(
        path.join(folder, child),
        path.join(DIST_DIR, action, child),
        { recursive: true },
      );
    }
  }
}

await main();
