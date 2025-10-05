import consola from "consola";
import type { Octokit } from "octokit";
import { splitOwnerRepo } from "../../../lib";
import type { ReleaseOptions } from "./types";
import { uploadReleaseAssets } from "./upload-assets";
import { waitForReleaseCreation } from "./wait";

export async function createRelease(
  octokit: Octokit,
  repository: string,
  tag: string,
  options?: ReleaseOptions,
): Promise<void> {
  const [owner, repo] = splitOwnerRepo(repository);
  const { data: release } = await octokit.rest.repos.createRelease({
    owner,
    repo,
    tag_name: tag,
    name: options?.title || tag,
    body: options?.changelog || undefined,
    prerelease: options?.prerelease,
    generate_release_notes: !options?.changelog,
  });
  // workaround for: <https://github.com/cli/cli/issues/5024#issuecomment-1028018586>
  await waitForReleaseCreation(octokit, repository, tag);
  await uploadReleaseAssets(octokit, release, options?.files);
  consola.success(`Created release ${tag} in ${repository}`);
}
