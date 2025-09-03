import * as core from "@actions/core";
import * as github from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";
import { RequestError } from "octokit";
import { getOwnerRepo } from "../../../lib";

async function hasPages(
  octokit: InstanceType<typeof GitHub>,
  owner: string,
  repo: string,
): Promise<boolean> {
  try {
    await octokit.rest.repos.getPages({ owner, repo });
    return true;
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.status === 404) return false;
    }
    throw error;
  }
}

export async function run(): Promise<void> {
  const token: string = core.getInput("token", { required: true });
  const [owner, repo] = getOwnerRepo("repository", { required: true });
  const octokit = github.getOctokit(token);
  if (await hasPages(octokit, owner, repo)) {
    await octokit.rest.repos.updateInformationAboutPagesSite({
      owner,
      repo,
      build_type: "legacy",
      source: { branch: "gh-pages", path: "/" },
    });
  } else {
    await octokit.rest.repos.createPagesSite({
      owner,
      repo,
      build_type: "legacy",
      source: { branch: "gh-pages", path: "/" },
    });
  }
}
