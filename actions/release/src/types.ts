import type { components } from "@octokit/openapi-types";

export type Release = components["schemas"]["release"];
export type ReleaseAsset = components["schemas"]["release-asset"];

export type ReleaseOptions = {
  changelog?: string;
  files?: string[];
  prerelease?: boolean;
  title?: string;
};
