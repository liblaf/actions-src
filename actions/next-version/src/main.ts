import * as core from "@actions/core";
import type { Release, Releases } from "./git-cliff";
import { cliffBumpedVersion, cliffContext } from "./git-cliff";

function getReleaseAs(release: Release): string | undefined {
  for (const commit of release.commits) {
    for (const footer of commit.footers) {
      if (footer.token === "Release-As") {
        return footer.value;
      }
    }
  }
}

function stripTagPrefix(tag: string): string {
  return tag.replace(/^v/, "");
}

async function runUnsafe(): Promise<void> {
  const context: Releases = await cliffContext();
  const bumpedVersion: string = await cliffBumpedVersion();
  const release: Release | undefined = context[0];
  if (!release || release.version) {
    core.setOutput("bumped", false);
    core.setOutput("release-as", false);
    core.setOutput("tag", bumpedVersion);
    core.setOutput("version", stripTagPrefix(bumpedVersion));
    return;
  }
  const releaseAs: string | undefined = getReleaseAs(release);
  let tag: string;
  let version: string;
  if (releaseAs) {
    version = stripTagPrefix(releaseAs);
    tag = `v${version}`;
    core.setOutput("release-as", true);
  } else {
    tag = bumpedVersion;
    version = stripTagPrefix(bumpedVersion);
    core.setOutput("release-as", false);
  }
  core.setOutput("bumped", tag !== release.previous?.version);
  core.setOutput("tag", tag);
  core.setOutput("version", version);
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
