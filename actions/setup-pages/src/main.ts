import * as core from "@actions/core";
import consola from "consola";
import { Octokit } from "octokit";
import { getOwnerRepo } from "../../../lib";

async function hasPages(
  octokit: Octokit,
  owner: string,
  repo: string,
): Promise<boolean> {
  try {
    await octokit.rest.repos.getPages({ owner, repo });
    return true;
  } catch (error) {
    // TODO: enable this when error instance check works
    // if (error instanceof RequestError) {
    //   if (error.status === 404) return false;
    // }
    // throw error;
    consola.error(`${error}`);
    return false;
  }
}

export async function run(): Promise<void> {
  const token: string = core.getInput("token", { required: true });
  const [owner, repo] = getOwnerRepo("repository", { required: true });
  const octokit = new Octokit({ auth: token });
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
