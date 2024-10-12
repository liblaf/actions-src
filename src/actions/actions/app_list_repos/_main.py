import json

import githubkit

import actions
import actions.toolkit.github as g
from actions.toolkit import core

from ._inputs import Inputs


@actions.utils.action()
async def main(inputs: Inputs) -> None:
    gh: g.GitHub = g.GitHub(
        githubkit.AppAuthStrategy(inputs.app_id, inputs.private_key)
    )
    repos: list[dict[str, str]] = []
    async for installation in gh.app.list_installations():
        gh = g.GitHub(
            githubkit.AppInstallationAuthStrategy(
                inputs.app_id, inputs.private_key, installation.id
            )
        )
        async for repo in gh.app.list_repos_accessible_to_installation():
            if repo.archived or repo.fork or repo.private:
                continue
            repos.append({"owner": repo.owner.login, "repo": repo.name})
    core.set_output("repos", json.dumps(repos))
