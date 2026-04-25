import * as github from "@actions/github";

import type { PullRequest, Review } from "./gh-pr";

export function prettyPr(pr: PullRequest): string {
  const { owner, repo } = github.context.repo;
  return `[${pr.title} - ${owner}/${repo}#${pr.number} by ${pr.author.login}](${pr.url})`;
}

export function requireReview(pr: PullRequest, reviewer: string): boolean {
  if (!pr.author.is_bot) return false;
  if (pr.isCrossRepository) return false;
  if (pr.mergeable !== "MERGEABLE") return false;
  if (pr.reviewDecision !== "REVIEW_REQUIRED") return false;
  return !pr.reviews.some(
    (review: Review): boolean => review.author.login === reviewer && review.state === "APPROVED",
  );
}
