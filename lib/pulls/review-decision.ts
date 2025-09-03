import type { graphql } from "@octokit/graphql/types";

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
  graphql: graphql,
  params: ReviewDecisionParams,
): Promise<PullRequestReviewDecision> {
  const response: ReviewDecisionResponse = await graphql(
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
