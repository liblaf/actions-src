import itertools
from collections.abc import AsyncGenerator
from typing import Any

import githubkit
import githubkit.versions.latest.models as m


class AppClient:
    _gh: githubkit.GitHub

    def __init__(self, gh: githubkit.GitHub) -> None:
        self._gh = gh

    async def list_installations(self) -> AsyncGenerator[m.Installation, Any]:
        for page in itertools.count(1):
            installations: list[m.Installation] = (
                await self._gh.rest.apps.async_list_installations(page=page)
            ).parsed_data
            if not installations:
                break
            for installation in installations:
                yield installation

    async def list_repos_accessible_to_installation(
        self,
    ) -> AsyncGenerator[m.Repository, Any]:
        total_count: int = 0
        for page in itertools.count(1):
            resp: m.InstallationRepositoriesGetResponse200 = (
                await self._gh.rest.apps.async_list_repos_accessible_to_installation(
                    page=page
                )
            ).parsed_data
            for repo in resp.repositories:
                yield repo
            total_count += len(resp.repositories)
            if total_count >= resp.total_count:
                break
