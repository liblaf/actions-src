import * as exec from "@actions/exec";

export type Footer = {
  token: string;
  value: string;
};

export type Commit = {
  footers: Footer[];
};

export type Release = {
  version: string | null;
  commits: Commit[];
  previous: Release | null;
};

export type Releases = Release[];

export async function cliffBumpedVersion(): Promise<string> {
  const { stdout } = await exec.getExecOutput("git-cliff", [
    "--bumped-version",
  ]);
  return stdout.trim();
}

export async function cliffContext(): Promise<Releases> {
  const { stdout } = await exec.getExecOutput("git-cliff", [
    "--unreleased",
    "--context",
  ]);
  return JSON.parse(stdout);
}
