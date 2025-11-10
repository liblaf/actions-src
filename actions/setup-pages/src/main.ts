import * as core from "@actions/core";
import consola from "consola";
import { Octokit, RequestError } from "octokit";
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
    if (error instanceof RequestError) {
      if (error.status === 404) return false;
    }
    consola.error(`${error}`);
    throw error;
  }
}

export async function runUnsafe(): Promise<void> {
  const [owner, repo] = getOwnerRepo("repository", { required: true });
  const branch: string = core.getInput("branch", { required: true });
  const build_type: "legacy" | "workflow" = core.getInput("build-type", {
    required: true,
  }) as any;
  const force: boolean = core.getBooleanInput("force", { required: true });
  const path: "/" | "/docs" = core.getInput("path", { required: true }) as any;
  const token: string = core.getInput("token", { required: true });
  const octokit = new Octokit({ auth: token });
  if (await hasPages(octokit, owner, repo)) {
    if (force) {
      await octokit.rest.repos.updateInformationAboutPagesSite({
        owner,
        repo,
        build_type,
        source: { branch, path },
      });
    } else {
      consola.info(`GitHub Pages is already enabled.`);
    }
  } else {
    await octokit.rest.repos.createPagesSite({
      owner,
      repo,
      build_type,
      source: { branch, path },
    });
  }
}

export async function run(): Promise<void> {
  try {
    await runUnsafe();
  } catch (err) {
    consola.error(err);
    if (err instanceof Error) core.setFailed(err.message);
  }
}
