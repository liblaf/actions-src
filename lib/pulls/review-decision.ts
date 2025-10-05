import type { Octokit } from "octokit";

export type PullRequestReviewDecision =
  | "APPROVED"
  | "CHANGES_REQUESTED"
  | "REVIEW_REQUIRED";

type ReviewDecisionParams = {
  owner: string;
  repo: string;
  pull_number: number;
};

type ReviewDecisionResponse = {
  repository: {
    pullRequest: {
      reviewDecision: PullRequestReviewDecision;
    };
  };
};

export async function getPullRequestReviewDecision(
  octokit: Octokit,
  params: ReviewDecisionParams,
): Promise<PullRequestReviewDecision> {
  const response: ReviewDecisionResponse = await octokit.graphql(
    `
      query ($owner: String!, $repo: String!, $pull_number: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $pull_number) {
            reviewDecision
          }
        }
      }
    `,
    params,
  );
  return response.repository.pullRequest.reviewDecision;
}
