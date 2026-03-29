import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";

type Review = {
  author: {
    login: string;
  };
  state: string;
};

type PullRequest = {
  author: {
    is_bot: boolean;
    login: string;
  };
  isCrossRepository: boolean;
  mergeable: string;
  number: number;
  reviewDecision: string;
  reviews: Review[];
  title: string;
  url: string;
};

const JSON_FIELDS: string[] = [
  "author",
  "isCrossRepository",
  "mergeable",
  "number",
  "reviewDecision",
  "reviews",
  "title",
  "url",
];

async function* filterPRs(
  prs: PullRequest[],
  actor: string,
): AsyncGenerator<PullRequest> {
  for (const pr of prs) {
    if (!pr.author.is_bot) continue;
    if (pr.isCrossRepository) continue;
    if (pr.mergeable !== "MERGEABLE") continue;
    if (pr.reviewDecision !== "REVIEW_REQUIRED") continue;
    if (
      pr.reviews.some(
        (review: Review): boolean =>
          review.author.login === actor && review.state === "APPROVED",
      )
    )
      continue;
    yield pr;
  }
}

async function listPRs(token: string): Promise<PullRequest[]> {
  const args: string[] = ["pr", "list"];
  args.push("--base", "main");
  args.push("--draft=false");
  args.push("--json", JSON_FIELDS.join(","));
  args.push("--label", "automerge");
  args.push("--state", "open");
  const { owner, repo } = github.context.repo;
  args.push("--repo", `${owner}/${repo}`);
  const { stdout } = await exec.getExecOutput("gh", args, {
    env: { ...process.env, GH_TOKEN: token },
  });
  return JSON.parse(stdout);
}

async function reviewPR(pr: PullRequest, token: string): Promise<void> {
  const args: string[] = ["pr", "review", pr.url];
  args.push("--approve");
  const { owner, repo } = github.context.repo;
  args.push("--repo", `${owner}/${repo}`);
  await exec.exec("gh", args, { env: { ...process.env, GH_TOKEN: token } });
}

async function runUnsafe(): Promise<void> {
  const actor: string = core.getInput("actor", { required: true });
  const listToken: string = core.getInput("list-token", { required: true });
  const reviewToken: string = core.getInput("review-token", { required: true });
  const prs: PullRequest[] = await listPRs(listToken);
  const { owner, repo } = github.context.repo;
  const errors: unknown[] = [];
  for await (const pr of filterPRs(prs, actor)) {
    try {
      await reviewPR(pr, reviewToken);
      core.info(
        `[${pr.title} - ${owner}/${repo}#${pr.number} by ${pr.author.login}](${pr.url})`,
      );
    } catch (err) {
      core.error(
        `Failed to review [${pr.title} - ${owner}/${repo}#${pr.number} by ${pr.author.login}](${pr.url}): ${err}`,
      );
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
