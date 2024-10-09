import tempfile
from typing import TYPE_CHECKING

from actions import utils
from actions.actions.release._assets import get_remote_hashsums, prepare_assets
from actions.ext.gh import Gh
from actions.toolkit import core

from ._inputs import Inputs

if TYPE_CHECKING:
    from pathlib import Path

    from actions.ext.gh.release import GhRelease


@utils.action()
async def main(inputs: Inputs) -> None:
    gh: Gh = Gh()
    release: GhRelease = gh.release(inputs.repo)
    create: bool = False
    with tempfile.TemporaryDirectory() as tmpdir:
        hashsums_local: dict[str, str]
        assets: list[Path]
        hashsums_local, assets = prepare_assets(tmpdir, inputs.files, inputs.algo)
        if await release.exists(inputs.tag):
            hashsums_remote: dict[str, str] = await get_remote_hashsums(
                release, inputs.tag, inputs.algo
            )
            if hashsums_local == hashsums_remote:
                core.notice(f"Hashsums match, skip release: {inputs.tag!r}")
                return
            if inputs.clobber:
                await release.delete(inputs.tag)
                create = True
                core.notice(f"Recreate release: {inputs.tag!r}")
            else:
                core.notice(f"Update release: {inputs.tag!r}")
                await release.upload(inputs.tag, *assets)
        else:
            create = True
            core.notice(f"Create release: {inputs.tag!r}")
        if create:
            await release.create(
                inputs.tag,
                *assets,
                notes=inputs.changelog,
                prerelease=inputs.prerelease,
            )
