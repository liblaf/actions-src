import githubkit
import githubkit.exception

import actions.toolkit.github as g


class GitHub:
    _gh: githubkit.GitHub

    def __init__(self, *args, **kwargs) -> None:
        self._gh = githubkit.GitHub(*args, **kwargs)

    @property
    def app(self) -> g.AppClient:
        return g.AppClient(self._gh)

    def repo(self, owner: str, repo: str) -> g.RepoClient:
        return g.RepoClient(self._gh, owner, repo)
