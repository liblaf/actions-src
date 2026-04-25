import * as core from "@actions/core";

export function safe(func: () => Promise<void>): () => Promise<void> {
  return async function wrapper(): Promise<void> {
    try {
      return await func();
    } catch (err) {
      if (typeof err === "string" || err instanceof Error) {
        core.setFailed(err);
      } else {
        core.setFailed(`${err}`);
      }
    }
  };
}
