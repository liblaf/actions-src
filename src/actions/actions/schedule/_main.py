from typing import Any

import githubkit
from loguru import logger

import actions
import actions.toolkit.github as g

from ._inputs import Inputs


@actions.utils.action()
async def main(inputs: Inputs) -> None:
    gh: g.GitHub = g.GitHub(
        githubkit.AppAuthStrategy(inputs.app_id, inputs.private_key)
    )
    async for installation in gh.app.list_installations():
        gh = g.GitHub(
            githubkit.AppInstallationAuthStrategy(
                inputs.app_id, inputs.private_key, installation.id
            )
        )
        async for repo in gh.app.list_repos_accessible_to_installation():
            if repo.archived or repo.fork or repo.private or repo.name == ".github":
                continue
            await create_workflow_dispatch(
                gh._gh,  # noqa: SLF001
                "liblaf",
                "actions",
                "bot-auto-merge.yaml",
                ref="main",
                inputs={"owner": repo.owner.login, "repo": repo.name},
            )
            await create_workflow_dispatch(
                gh._gh,  # noqa: SLF001
                "liblaf",
                "repo",
                "sync.yaml",
                ref="main",
                inputs={"owner": repo.owner.login, "repo": repo.name},
            )


async def create_workflow_dispatch(
    gh: githubkit.GitHub,
    owner: str,
    repo: str,
    workflow_id: int | str,
    *,
    ref: str = "main",
    inputs: dict[str, Any] | None = None,
) -> None:
    await gh.rest.actions.async_create_workflow_dispatch(
        owner,
        repo,
        workflow_id,
        ref=ref,
        inputs=inputs,  # pyright: ignore [reportArgumentType]
    )
    logger.info("{}/{}:{} {}", owner, repo, workflow_id, inputs)
