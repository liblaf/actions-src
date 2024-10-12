import githubkit
import githubkit.exception
import githubkit.versions

import actions.toolkit.github as g


class GitHub:
    _gh: githubkit.GitHub

    def __init__(self, *args, **kwargs) -> None:
        self._gh = githubkit.GitHub(*args, **kwargs)

    @property
    def app(self) -> g.AppClient:
        return g.AppClient(self._gh)

    @property
    def rest(self) -> githubkit.versions.rest.RestVersionSwitcher:
        return self._gh.rest

    def repo(self, owner: str, repo: str) -> g.RepoClient:
        return g.RepoClient(self._gh, owner, repo)
