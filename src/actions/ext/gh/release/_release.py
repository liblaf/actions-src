import dataclasses
import subprocess as sp
from typing import TYPE_CHECKING

import tenacity

import actions
from actions.typing import StrPath

if TYPE_CHECKING:
    from actions.ext.gh import Gh


@dataclasses.dataclass()
class GhRelease:
    parent: "Gh"
    repo: str | None = None

    async def create(
        self,
        tag: str,
        *files: StrPath,
        draft: bool = False,
        generate_notes: bool = False,
        latest: bool | None = None,
        notes: str | None = None,
        prerelease: bool = False,
        title: str | None = None,
    ) -> None:
        args: list[str] = self.args
        args.extend(["create", tag])
        if files:
            args.extend([str(f) for f in files])
        if draft:
            args.append("--draft")
        if generate_notes:
            args.append("--generate-notes")
        if latest is not None:
            if latest:
                args.append("--latest")
            else:
                args.append("--latest=false")
        if notes:
            args.extend(["--notes", notes])
        if prerelease:
            args.append("--prerelease")
        if title:
            args.extend(["--title", title])
        await actions.utils.run(*args)
        await self._wait_util_release_status(tag, exists=True)

    async def delete(self, tag: str, *, cleanup_tag: bool = True) -> None:
        args: list[str] = self.args
        args.extend(["delete", tag])
        if cleanup_tag:
            args.append("--cleanup-tag")
        args.append("--yes")
        await actions.utils.run(*args)
        await self._wait_util_release_status(tag, exists=False)

    async def download(self, tag: str, *, pattern: str) -> str:
        args: list[str] = self.args
        args.extend(["download", tag, "--pattern", pattern])
        stdout: str = await actions.utils.run(*args, capture_stdout=True, text=True)
        return stdout

    async def upload(self, tag: str, *files: StrPath, clobber: bool = True) -> None:
        args: list[str] = self.args
        args.extend(["upload", tag])
        args.extend([str(f) for f in files])
        if clobber:
            args.append("--clobber")
        await actions.utils.run(*args)

    async def view(self, tag: str) -> None:
        args: list[str] = self.args
        args.extend(["view", tag])
        await actions.utils.run(*args)

    async def exists(self, tag: str) -> bool:
        try:
            await self.view(tag)
        except sp.CalledProcessError:
            return False
        else:
            return True

    @property
    def args(self) -> list[str]:
        args: list[str] = self.parent.args
        args.append("release")
        if self.repo:
            args.extend(["--repo", self.repo])
        return args

    @tenacity.retry(wait=tenacity.wait_random_exponential())
    async def _wait_util_release_status(self, tag: str, *, exists: bool = True) -> None:
        if await self.exists(tag) != exists:
            msg: str
            if exists:
                msg = f"Release {tag!r} does not exist"
            else:
                msg = f"Release {tag!r} still exists"
            raise RuntimeError(msg)
