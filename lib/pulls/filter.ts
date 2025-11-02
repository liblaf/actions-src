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
};

export class PullRequestFilter {
  readonly authors: string[];
  readonly bot: boolean;
  readonly labels: string[];

  constructor(
    public readonly octokit: Octokit,
    options?: FilterOptions,
  ) {
    if (options === undefined) {
      options = {
        authors: core.getMultilineInput("authors"),
        bot: core.getBooleanInput("bot", { required: true }),
        labels: core.getMultilineInput("labels"),
      };
    }
    this.authors = options.authors ?? [];
    this.bot = options.bot ?? true;
    this.labels = options.labels ?? [];
  }

  async *filterPullRequest(pull: PullRequest): AsyncGenerator<PullRequest> {
    if (pull.state !== "open") {
      consola.info(
        { state: pull.state },
        `State: ${pull.state}. Skip ${prettyPullRequest(pull)}`,
      );
      return;
    }
    if (this.authors.length > 0 && !this.authors.includes(pull.user!.login)) {
      consola.info(
        { author: pull.user!.login },
        `Skip ${prettyPullRequest(pull)}`,
      );
      return;
    }
    if (this.bot && pull.user!.type !== "Bot") {
      consola.info(
        { "user.type": pull.user!.type },
        `Skip ${prettyPullRequest(pull)}`,
      );
      return;
    }
    if (this.labels.length > 0) {
      const labels: string[] = pull.labels.map(
        (label: { name: string }): string => label.name,
      );
      if (
        !this.labels.some((label: string): boolean => labels.includes(label))
      ) {
        consola.info({ labels }, `Skip ${prettyPullRequest(pull)}`);
        return;
      }
    }
    yield pull;
  }

  async *filterRepository(repository: Repository): AsyncGenerator<PullRequest> {
    if (repository.archived) {
      consola.info(
        { archived: repository.archived },
        `Skip ${repository.full_name}`,
      );
      return;
    }
    if (repository.fork) {
      consola.info({ fork: repository.fork }, `Skip ${repository.full_name}`);
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
