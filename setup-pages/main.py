# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "githubkit",
#     "httpx",
#     "liblaf-actions",
# ]
# ///


import githubkit
import githubkit.exception
import httpx

from liblaf import actions
from liblaf.actions import github


class Inputs(actions.Inputs):
    repo: str


async def main(inputs: Inputs) -> None:
    owner: str
    repo: str
    owner, _, repo = inputs.repo
    gh: githubkit.GitHub = github.get_octokit()
    try:
        await gh.rest.repos.async_get_pages(owner=owner, repo=repo)
        await gh.rest.repos.async_update_information_about_pages_site(
            owner=owner,
            repo=repo,
            build_type="legacy",
            source={"branch": "gh-pages", "path": "/"},
        )
    except githubkit.exception.RequestFailed as err:
        if err.response.status_code == httpx.codes.NOT_FOUND:
            await gh.rest.repos.async_create_pages_site(
                owner=owner,
                repo=repo,
                build_type="legacy",
                source={"branch": "gh-pages", "path": "/"},
            )
        else:
            raise


if __name__ == "__main__":
    actions.run(main)
