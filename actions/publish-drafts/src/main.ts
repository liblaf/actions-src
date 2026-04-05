import * as core from "@actions/core";
import * as github from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";
import type { components } from "@octokit/openapi-types";
import parse from "parse-duration";

type Octokit = InstanceType<typeof GitHub>;
type Release = components["schemas"]["release"];

function prettyRelease(release: Release): string {
  return release.name ?? release.tag_name;
}

function getCutoff(): number {
  const input: string = core.getInput("older-than", { required: true });
  const parsed: number = parse(input)!;
  const now: number = Date.now();
  const cutoff: number = now - parsed;
  return cutoff;
}

function getTagRegex(): RegExp {
  const input: string = core.getInput("tag-pattern", { required: true });
  return new RegExp(input);
}

async function runUnsafe(): Promise<void> {
  const cutoff: number = getCutoff();
  const tagRegex: RegExp = getTagRegex();
  const token: string = core.getInput("token", { required: true });

  const { owner, repo } = github.context.repo;
  const errors: unknown[] = [];
  const octokit: Octokit = github.getOctokit(token);
  for await (const { data: releases } of octokit.paginate.iterator(
    octokit.rest.repos.listReleases,
    { owner, repo },
  )) {
    for (const release of releases) {
      if (!release.draft) continue;
      if (!tagRegex.test(release.tag_name)) continue;
      const createdAt: number = Date.parse(release.created_at)!;
      if (createdAt > cutoff) continue;
      try {
        await octokit.rest.repos.updateRelease({
          owner,
          repo,
          release_id: release.id,
          draft: false,
        });
        core.notice(`Published ${prettyRelease(release)}.`);
      } catch (err) {
        core.error(`Failed to publish ${prettyRelease(release)}: ${err}`);
        errors.push(err);
      }
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
  } catch (error) {
    if (typeof error === "string" || error instanceof Error) {
      core.setFailed(error);
    } else {
      core.setFailed(`${error}`);
    }
  }
}
