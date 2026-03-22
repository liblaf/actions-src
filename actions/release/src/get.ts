import consola from "consola";
import type { Octokit } from "octokit";
import { isErrorStatus, splitOwnerRepo } from "../../../lib";
import type { Release } from "./types";

export async function getReleaseByTag(
  octokit: Octokit,
  repository: string,
  tag: string,
): Promise<Release | undefined> {
  const [owner, repo] = splitOwnerRepo(repository);
  try {
    const { data: release } = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });
    return release;
  } catch (error) {
    if (isErrorStatus(error, 404)) {
      consola.info(`Release not found: ${tag} in ${repository}`);
      return undefined;
    } else {
      throw error;
    }
  }
}
