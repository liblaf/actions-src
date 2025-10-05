import consola from "consola";
import { type Octokit, RequestError } from "octokit";
import { splitOwnerRepo } from "../../../lib";
import type { Release } from "./types";
import { waitForReleaseDeletion } from "./wait";

export async function deleteRelease(
  octokit: Octokit,
  repository: string,
  release: Release,
): Promise<void> {
  const [owner, repo] = splitOwnerRepo(repository);
  try {
    await octokit.rest.repos.deleteRelease({
      owner,
      repo,
      release_id: release.id,
    });
  } catch (err) {
    if (err instanceof RequestError && err.status === 404) {
      consola.warn(`Release not found: ${release.tag_name} in ${repository}.`);
    } else {
      throw err;
    }
  }
  try {
    await octokit.rest.git.deleteRef({
      owner,
      repo,
      ref: `tags/${release.tag_name}`,
    });
  } catch (err) {
    if (err instanceof RequestError && err.status === 404) {
      consola.warn(`Tag not found: ${release.tag_name} in ${repository}.`);
    } else {
      throw err;
    }
  }
  // workaround for: <https://github.com/cli/cli/issues/5024#issuecomment-1028018586>
  await waitForReleaseDeletion(octokit, repository, release.tag_name);
  consola.success(`Deleted release ${release.tag_name} in ${repository}.`);
}
