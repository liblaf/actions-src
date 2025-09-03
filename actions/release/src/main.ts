import fs from "node:fs";
import * as core from "@actions/core";
import * as github from "@actions/github";
import * as glob from "@actions/glob";
import { createRelease } from "./create";
import { deleteRelease } from "./delete";
import { getReleaseByTag } from "./get";
import { matchReleaseAssets } from "./match-assets";
import type { Octokit, Release, ReleaseOptions } from "./types";
import { updateRelease } from "./update";

async function getFiles(): Promise<string[]> {
  const patterns: string[] = core.getMultilineInput("files");
  const files: string[] = (
    await Promise.all(
      patterns.map(async (pattern: string): Promise<string[]> => {
        const globber: glob.Globber = await glob.create(pattern, {
          matchDirectories: false,
        });
        return await globber.glob();
      }),
    )
  ).flat();
  const filtered: string[] = [];
  for (const file of files) {
    const size: number = await (await fs.promises.stat(file)).size;
    if (size > 0) {
      filtered.push(file);
    } else {
      core.warning(`Skip empty file: ${file}`);
    }
  }
  return filtered;
}

export async function run(): Promise<void> {
  const changelogFile: string = core.getInput("changelog-file", {
    required: false,
  });
  const clobber: boolean = core.getBooleanInput("clobber", {
    required: true,
  });
  const files: string[] = await getFiles();
  const prerelease: boolean = core.getBooleanInput("prerelease", {
    required: false,
  });
  const repository: string = core.getInput("repository", { required: true });
  const tag: string = core.getInput("tag", { required: true });
  const title: string = core.getInput("title", { required: false });
  const token: string = core.getInput("token", { required: true });

  const changelog: string | undefined = fs.existsSync(changelogFile)
    ? await fs.promises.readFile(changelogFile, "utf-8")
    : undefined;
  const octokit: Octokit = github.getOctokit(token);
  const options: ReleaseOptions = { changelog, files, prerelease, title };

  const release: Release | undefined = await getReleaseByTag(
    octokit,
    repository,
    tag,
  );
  if (release) {
    if (await matchReleaseAssets(files, release)) {
      core.notice(
        `Release assets match, skip release: ${release.tag_name} in ${repository}`,
      );
      return;
    }
    if (clobber) {
      await deleteRelease(octokit, repository, release);
      await createRelease(octokit, repository, tag, options);
      core.notice(`Recreate release: ${release.tag_name} in ${repository}`);
      return;
    }
    await updateRelease(octokit, repository, release, options);
    core.notice(`Update release: ${release.tag_name} in ${repository}`);
    return;
  }
  await createRelease(octokit, repository, tag, options);
  core.notice(`Create release: ${tag} in ${repository}`);
}
