import * as core from "@actions/core";
import consola from "consola";
import { Octokit } from "octokit";
import type { PullRequest, PullRequestReviewDecision } from "../../../lib";
import {
  getPullRequestReviewDecision,
  PullRequestFilter,
  prettyPullRequest,
} from "../../../lib";

async function approvePullRequest(
  octokit: Octokit,
  pull: PullRequest,
): Promise<void> {
  const reviewDecision: PullRequestReviewDecision =
    await getPullRequestReviewDecision(octokit, {
      owner: pull.base.repo.owner.login,
      repo: pull.base.repo.name,
      pull_number: pull.number,
    });
  if (reviewDecision !== "REVIEW_REQUIRED") return;
  await octokit.rest.pulls.createReview({
    owner: pull.base.repo.owner.login,
    repo: pull.base.repo.name,
    pull_number: pull.number,
    event: "APPROVE",
  });
  core.notice(`Approved ${prettyPullRequest(pull)}`);
}

export async function runUnsafe(): Promise<void> {
  const approveToken: string = core.getInput("approve-token", {
    required: true,
  });
  const listToken: string = core.getInput("list-token", { required: true });
  const approveOctokit = new Octokit({ auth: approveToken });
  const listOctokit = new Octokit({ auth: listToken });
  const filter = new PullRequestFilter(listOctokit);
  for await (const pull of filter.filter())
    await approvePullRequest(approveOctokit, pull);
}

export async function run(): Promise<void> {
  try {
    await runUnsafe();
  } catch (err) {
    consola.error(err);
    if (err instanceof Error) core.setFailed(err.message);
  }
}
