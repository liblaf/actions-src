import { RequestError } from "octokit";
import { splitOwnerRepo } from "../../../lib";
import type { Octokit, Release } from "./types";

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
    if (error instanceof RequestError) {
      if (error.status === 404) return undefined;
    }
    throw error;
  }
}
