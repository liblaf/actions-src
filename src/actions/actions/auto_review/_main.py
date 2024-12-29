from typing import Any

import githubkit

import actions

from ._inputs import Inputs


@actions.utils.action()
async def main(inputs: Inputs) -> None:
    _: Any
    gh = githubkit.GitHub(inputs.token)
    owner: str
    repo: str
    owner, _, repo = inputs.repo.partition("/")
    async for pr in gh.paginate(
        gh.rest.pulls.async_list, owner=owner, repo=repo, state="open"
    ):
        if (pr.user is None) or (pr.user.login not in inputs.author):
            continue
        async for review in gh.paginate(
            gh.rest.pulls.async_list_reviews,
            owner=owner,
            repo=repo,
            pull_number=pr.number,
        ):
            if review.state == "APPROVED" and review.commit_id == pr.head.sha:
                break
        else:
            await gh.rest.pulls.async_create_review(
                owner=owner, repo=repo, pull_number=pr.number, event="APPROVE"
            )
