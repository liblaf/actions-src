import fs from "node:fs/promises";
import path from "node:path";
import consola from "consola";
import type { Octokit, Release } from "./types";

async function upload(
  octokit: Octokit,
  upload_url: string,
  file: string,
): Promise<void> {
  const name: string = path.basename(file);
  const content = await fs.readFile(file);
  await octokit.request({
    method: "POST",
    url: upload_url,
    name: name,
    data: content,
  });
  consola.success(`Uploaded asset: ${file}`);
}

export async function uploadReleaseAssets(
  octokit: Octokit,
  release: Release,
  files?: string[],
): Promise<void> {
  if (!files || files.length === 0) return;
  const futures: Promise<void>[] = [];
  for (const file of files) {
    futures.push(upload(octokit, release.upload_url, file));
  }
  await Promise.all(futures);
}
