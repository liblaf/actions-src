import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import consola from "consola";
import type { Release, ReleaseAsset } from "./types";

export async function matchReleaseAssets(
  files: string[],
  release: Release,
): Promise<boolean> {
  for (const file of files) {
    const name: string = path.basename(file);
    const fileSize: number = (await fs.stat(file)).size;
    const asset: ReleaseAsset | undefined = release.assets.find(
      (asset: ReleaseAsset): boolean => asset.name === name,
    );
    if (!asset) {
      consola.info(`Release asset not found: ${name}`);
      return false;
    }
    if (fileSize !== asset.size) {
      consola.info(
        { local: fileSize, release: asset.size },
        `File size mismatch for ${name}`,
      );
      return false;
    }
    const digest: string | undefined = (asset as any).digest;
    if (!digest) return false;
    const [algorithm, hash] = digest.split(":");
    if (!(algorithm && hash)) return false;
    const buffer: Buffer = await fs.readFile(file);
    const fileHash: string = crypto
      .createHash(algorithm)
      .update(buffer)
      .digest("hex");
    if (fileHash !== hash) {
      consola.info(
        { local: fileHash, release: hash },
        `File hash mismatch for ${name}`,
      );
      return false;
    }
  }
  consola.success("All release assets match.");
  return true;
}
