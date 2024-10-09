from actions.ext.gh.release._release import GhRelease


class Gh:
    def release(self, repo: str | None = None) -> GhRelease:
        return GhRelease(self, repo)

    @property
    def args(self) -> list[str]:
        return ["gh"]
