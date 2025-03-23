from typing import Any

import githubkit
import githubkit.versions.latest.models as ghm
import githubkit.versions.latest.types as ght
import pydantic

from liblaf.actions import core, toolkit, utils

from . import Inputs


@utils.action()
async def main(inputs: Inputs) -> None:
    _: Any
    gh: githubkit.GitHub = toolkit.github.get_octokit()
    owner: str
    repo: str
    owner, _, repo = inputs.repo.partition("/")
    source_owner: str
    source_repo: str
    source_owner, _, source_repo = inputs.source_repo.partition("/")
    source_ruleset: ghm.RepositoryRuleset = (
        await gh.rest.repos.async_get_repo_ruleset(
            source_owner, source_repo, inputs.source_ruleset_id
        )
    ).parsed_data
    target_ruleset: ghm.RepositoryRuleset | None = await find_ruleset(
        owner, repo, source_ruleset.name
    )
    if target_ruleset is not None:
        await update_ruleset(owner, repo, source_ruleset, target_ruleset.id)
    else:
        await create_ruleset(owner, repo, source_ruleset)


async def find_ruleset(
    owner: str, repo: str, name: str
) -> ghm.RepositoryRuleset | None:
    gh: githubkit.GitHub = toolkit.github.get_octokit()
    async for ruleset in gh.paginate(
        gh.rest.repos.async_get_repo_rulesets, owner=owner, repo=repo
    ):
        if ruleset.name == name:
            return (
                await gh.rest.repos.async_get_repo_ruleset(owner, repo, ruleset.id)
            ).parsed_data
    return None


async def create_ruleset(owner: str, repo: str, ruleset: ghm.RepositoryRuleset) -> None:
    gh: githubkit.GitHub = toolkit.github.get_octokit()
    adapter = pydantic.TypeAdapter(ght.ReposOwnerRepoRulesetsPostBodyType)
    data: ght.ReposOwnerRepoRulesetsPostBodyType = adapter.validate_python(
        ruleset.model_dump(exclude_unset=True, exclude_defaults=True, exclude_none=True)
    )
    core.notice(f'Create Ruleset "{ruleset.name}".')
    await gh.rest.repos.async_create_repo_ruleset(owner, repo, data=data)


async def update_ruleset(
    owner: str, repo: str, ruleset: ghm.RepositoryRuleset, target_ruleset_id: int
) -> None:
    gh: githubkit.GitHub = toolkit.github.get_octokit()
    adapter = pydantic.TypeAdapter(ght.ReposOwnerRepoRulesetsRulesetIdPutBodyType)
    data: ght.ReposOwnerRepoRulesetsRulesetIdPutBodyType = adapter.validate_python(
        ruleset.model_dump(exclude_unset=True, exclude_defaults=True, exclude_none=True)
    )
    core.notice(f'Update Ruleset "{ruleset.name}".')
    await gh.rest.repos.async_update_repo_ruleset(
        owner, repo, target_ruleset_id, data=data
    )
