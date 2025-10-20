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
  const token: string = core.getInput("token", { required: true });
  const octokit = new Octokit({ auth: token });
  const filter = new PullRequestFilter(octokit);
  const futures: Promise<void>[] = [];
  for (const pull of await filter.filter()) {
    futures.push(approvePullRequest(octokit, pull));
  }
  await Promise.all(futures);
}

export async function run(): Promise<void> {
  try {
    await runUnsafe();
  } catch (err) {
    consola.error(err);
    if (err instanceof Error) core.setFailed(err.message);
  }
}
