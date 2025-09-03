import * as core from "@actions/core";

export function getOwnerRepo(
  name: string = "repository",
  options: core.InputOptions = { required: true },
): [string, string] {
  const full_name: string = core.getInput(name, options);
  return splitOwnerRepo(full_name);
}

export function splitOwnerRepo(full_name: string): [string, string] {
  const [owner, repo] = full_name.split("/");
  return [owner!, repo!];
}
