import consola from "consola";
import type { Octokit } from "octokit";
import { splitOwnerRepo } from "../../../lib";
import type { Release, ReleaseOptions } from "./types";
import { uploadReleaseAssets } from "./upload-assets";

export async function updateRelease(
  octokit: Octokit,
  repository: string,
  release: Release,
  options?: ReleaseOptions,
): Promise<void> {
  const [owner, repo] = splitOwnerRepo(repository);
  await octokit.rest.repos.updateRelease({
    owner,
    repo,
    release_id: release.id,
    tag_name: release.tag_name,
    name: options?.title || release.tag_name,
    body: options?.changelog || undefined,
    prerelease: options?.prerelease,
  });
  await uploadReleaseAssets(octokit, release, options?.files);
  consola.success(`Updated release ${release.tag_name} in ${repository}`);
}
