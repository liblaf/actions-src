import * as core from "@actions/core";
import * as github from "@actions/github";
import type { Octokit } from "octokit";
import type { PullRequest } from "../../../lib";
import { PullRequestFilter, prettyPullRequest } from "../../../lib";

async function addLabelsToPullRequest(
  octokit: Octokit,
  pull: PullRequest,
  addLabels: string[],
): Promise<void> {
  await octokit.rest.issues.addLabels({
    owner: pull.base.repo.owner.login,
    repo: pull.base.repo.name,
    issue_number: pull.number,
    labels: addLabels,
  });
  core.notice(`Added labels ${addLabels} to ${prettyPullRequest(pull)}`);
}

export async function run(): Promise<void> {
  const addLabels: string[] = core.getMultilineInput("add-labels", {
    required: true,
  });
  const token: string = core.getInput("token", { required: true });
  const octokit = github.getOctokit(token) as unknown as Octokit;
  const filter = new PullRequestFilter(octokit);
  const futures: Promise<void>[] = [];
  for (const pull of await filter.filter()) {
    futures.push(addLabelsToPullRequest(octokit, pull, addLabels));
  }
  await Promise.all(futures);
}
