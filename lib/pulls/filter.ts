import * as core from "@actions/core";
import * as github from "@actions/github";
import consola from "consola";
import type { Octokit } from "octokit";
import { splitOwnerRepo } from "../inputs";
import type { PullRequest, Repository } from "./types";

export type FilterOptions = {
  authors?: string[];
  bot?: boolean;
  labels?: string[];
  reviewer: string;
};

export class PullRequestFilter {
  readonly authors: string[];
  readonly bot: boolean;
  readonly labels: string[];
  readonly reviewer?: string;

  constructor(
    public readonly octokit: Octokit,
    options?: FilterOptions,
  ) {
    this.authors = options?.authors ?? core.getMultilineInput("authors") ?? [];
    this.bot =
      options?.bot ?? core.getBooleanInput("bot", { required: true }) ?? true;
    this.labels = options?.labels ?? core.getMultilineInput("labels") ?? [];
    this.reviewer = options?.reviewer;
  }

  protected async filterAuthors(pull: PullRequest): Promise<boolean> {
    if (this.authors.length === 0) return true;
    const author: string = pull.user!.login;
    const filtered: boolean = this.authors.includes(author);
    if (!filtered) consola.info(`Skip ${prettyPullRequest(pull)}`, { author });
    return filtered;
  }

  protected async filterBot(pull: PullRequest): Promise<boolean> {
    if (!this.bot) return true;
    const userType: string = pull.user!.type;
    const filtered: boolean = userType === "Bot";
    if (!filtered)
      consola.info(`Skip ${prettyPullRequest(pull)}`, { userType });
    return filtered;
  }

  protected async filterLabels(pull: PullRequest): Promise<boolean> {
    if (this.labels.length === 0) return true;
    const labels: string[] = pull.labels.map(
      (label: { name: string }): string => label.name,
    );
    const filtered: boolean = this.labels.some((label: string): boolean =>
      labels.includes(label),
    );
    if (!filtered) consola.info(`Skip ${prettyPullRequest(pull)}`, { labels });
    return filtered;
  }

  protected async filterReviewer(pull: PullRequest): Promise<boolean> {
    const { reviewer } = this;
    if (!reviewer) return true;
    for await (const { data: reviews } of this.octokit.paginate.iterator(
      this.octokit.rest.pulls.listReviews,
      {
        owner: pull.base.repo.owner.login,
        repo: pull.base.repo.name,
        pull_number: pull.number,
      },
    )) {
      for (const review of reviews) {
        if (review.state !== "APPROVED") continue;
        if (review.user!.login !== reviewer) continue;
        consola.info(`Skip ${prettyPullRequest(pull)}`, { reviewer });
        return false;
      }
    }
    return true;
  }

  async *filterPullRequest(pull: PullRequest): AsyncGenerator<PullRequest> {
    if (!(await this.filterAuthors(pull))) return;
    if (!(await this.filterBot(pull))) return;
    if (!(await this.filterLabels(pull))) return;
    if (!(await this.filterReviewer(pull))) return;
    yield pull;
  }

  async *filterRepository(repository: Repository): AsyncGenerator<PullRequest> {
    const { archived } = repository;
    if (archived) {
      consola.info(`Skip ${repository.full_name}`, { archived });
      return;
    }
    const { fork } = repository;
    if (fork) {
      consola.info(`Skip ${repository.full_name}`, { fork });
      return;
    }
    consola.start(`Inspecting repository: ${repository.full_name} ...`);
    for await (const { data: pulls } of this.octokit.paginate.iterator(
      this.octokit.rest.pulls.list,
      { owner: repository.owner.login, repo: repository.name, state: "open" },
    )) {
      for (const pull of pulls) yield* this.filterPullRequest(pull);
    }
  }

  async *filterOwner(owner: string): AsyncGenerator<PullRequest> {
    for await (const { data: repositories } of this.octokit.paginate.iterator(
      this.octokit.rest.repos.listForUser,
      { username: owner, type: "owner" },
    )) {
      for (const repository of repositories) {
        yield* this.filterRepository(repository);
      }
    }
  }

  async *filter(): AsyncGenerator<PullRequest> {
    const pull_number: number | "all" = getPullNumber();
    const repository: string = core.getInput("repository", { required: true });
    if (pull_number === "all") {
      const [owner, repo] = repository.split("/");
      if (owner && repo) {
        const { data: repository } = await this.octokit.rest.repos.get({
          owner,
          repo,
        });
        yield* this.filterRepository(repository);
      } else {
        yield* this.filterOwner(owner!);
      }
    } else {
      const [owner, repo] = splitOwnerRepo(repository);
      const { data: pull } = await this.octokit.rest.pulls.get({
        owner,
        repo,
        pull_number,
      });
      yield* this.filterPullRequest(pull);
    }
  }
}

function getPullNumber(): number | "all" {
  const input: string = core.getInput("pull-number");
  if (input === "all") return "all";
  if (input) return Number.parseInt(input, 10);
  return github.context.payload.pull_request?.number ?? "all";
}

export function prettyPullRequest(pull: PullRequest): string {
  return `${pull.base.repo.full_name}#${pull.number} by ${pull.user!.login} - ${pull.title}`;
}
