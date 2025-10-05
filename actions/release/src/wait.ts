import type { Octokit } from "octokit";
import { sleep } from "../../../lib";
import { getReleaseByTag } from "./get";
import type { Release } from "./types";

export async function waitForReleaseCreation(
  octokit: Octokit,
  repository: string,
  tag: string,
  timeout_ms: number = 60000,
  wait_ms: number = 5000,
): Promise<void> {
  for (let waited: number = 0; waited < timeout_ms; waited += wait_ms) {
    const release: Release | undefined = await getReleaseByTag(
      octokit,
      repository,
      tag,
    );
    if (release) return;
    await sleep(wait_ms);
  }
  throw new Error(
    `Timed out waiting for release ${tag} to be created in repository ${repository} after ${timeout_ms} ms.`,
  );
}

export async function waitForReleaseDeletion(
  octokit: Octokit,
  repository: string,
  tag: string,
  timeout_ms: number = 60000,
  wait_ms: number = 5000,
): Promise<void> {
  for (let waited: number = 0; waited < timeout_ms; waited + wait_ms) {
    const release: Release | undefined = await getReleaseByTag(
      octokit,
      repository,
      tag,
    );
    if (!release) return;
    await sleep(wait_ms);
  }
  throw new Error(
    `Timed out waiting for release ${tag} to be deleted in repository ${repository} after ${timeout_ms} ms.`,
  );
}
