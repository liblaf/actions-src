import githubkit
import githubkit.exception

import actions.toolkit.github as g


class GitHub:
    _gh: githubkit.GitHub

    def __init__(self) -> None:
        self._gh = githubkit.GitHub(githubkit.ActionAuthStrategy())

    def repo(self, owner: str, repo: str) -> g.GitHubRepo:
        return g.GitHubRepo(self._gh, owner, repo)
