import * as exec from "@actions/exec";
import * as github from "@actions/github";

export type Review = {
  author: {
    login: string;
  };
  state: string;
};

export type PullRequest = {
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

export type GhPrListOptions = {
  app?: string;
  label?: string[];
  token: string;
};

export async function ghPrList(options: GhPrListOptions): Promise<PullRequest[]> {
  const args: string[] = ["pr", "list"];
  if (options.app) args.push("--app", options.app);
  args.push("--base", "main");
  args.push("--draft=false");
  args.push("--json", JSON_FIELDS.join(","));
  for (const label of options.label ?? []) args.push("--label", label);
  args.push("--state", "open");
  const { owner, repo } = github.context.repo;
  args.push("--repo", `${owner}/${repo}`);
  const { stdout } = await exec.getExecOutput("gh", args, {
    env: { ...process.env, GH_TOKEN: options.token },
  });
  return JSON.parse(stdout);
}

export async function ghPrView(token: string, pr: number | string): Promise<PullRequest> {
  const args: string[] = ["pr", "view", `${pr}`];
  args.push("--json", JSON_FIELDS.join(","));
  const { owner, repo } = github.context.repo;
  args.push("--repo", `${owner}/${repo}`);
  const { stdout } = await exec.getExecOutput("gh", args, {
    env: { ...process.env, GH_TOKEN: token },
  });
  return JSON.parse(stdout);
}
