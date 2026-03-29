import * as exec from "@actions/exec";
import { stripTagPrefix } from "./utils";

export async function getReleaseAs(
  previous: string | null | undefined,
): Promise<string | undefined> {
  const range: string = previous ? `${previous}..HEAD` : "HEAD";
  const args: string[] = ["log"];
  args.push("--pretty=$(trailers:key=Release-As,valueonly)");
  args.push(range);
  const { stdout } = await exec.getExecOutput("git", args);
  const lines: string[] = stdout
    .split("\n")
    .map((line: string): string => line.trim())
    .filter(Boolean);
  const tag: string | undefined = lines[0];
  return tag ? stripTagPrefix(tag) : undefined;
}
