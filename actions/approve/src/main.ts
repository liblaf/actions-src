import * as core from "@actions/core";
import * as github from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";

import type { PullRequest } from "./gh-pr";
import { ghPrList, ghPrView } from "./gh-pr";
import { prettyPr, requireReview } from "./utils";

type Inputs = {
  app: string;
  approveToken: string;
  label: string[];
  listToken: string;
  pull: string;
};

type Octokit = InstanceType<typeof GitHub>;

async function getInputs(): Promise<Inputs> {
  const inputs: Inputs = {
    app: core.getInput("app", { required: false }),
    approveToken: core.getInput("approve-token", { required: true }),
    label: core.getMultilineInput("label", { required: true }),
    listToken: core.getInput("list-token", { required: true }),
    pull: core.getInput("pull", { required: false }),
  };
  return inputs;
}

async function runUnsafe(): Promise<void> {
  const inputs: Inputs = await getInputs();
  const prs: PullRequest[] = inputs.pull
    ? [await ghPrView(inputs.listToken, inputs.pull)]
    : await ghPrList({
        app: inputs.app,
        label: inputs.label,
        token: inputs.listToken,
      });
  const { owner, repo } = github.context.repo;
  const errors: unknown[] = [];
  const octokit: Octokit = github.getOctokit(inputs.approveToken);
  const reviewer: string = (await octokit.rest.users.getAuthenticated()).data.login;
  for (const pr of prs) {
    if (!requireReview(pr, reviewer)) {
      core.info(`Skipped ${prettyPr(pr)}`);
      continue;
    }
    try {
      await octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number: pr.number,
        event: "APPROVE",
      });
      core.notice(`Approved ${prettyPr(pr)} as ${reviewer}`);
    } catch (err) {
      core.error(`Failed to review ${prettyPr(pr)}: ${err}`);
      errors.push(err);
    }
  }
  if (errors.length === 1) {
    throw errors[0];
  } else if (errors.length > 1) {
    throw new AggregateError(errors);
  }
}

export async function run(): Promise<void> {
  try {
    await runUnsafe();
  } catch (err) {
    if (typeof err === "string" || err instanceof Error) {
      core.setFailed(err);
    } else {
      core.setFailed(`${err}`);
    }
  }
}
