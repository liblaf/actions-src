import githubkit

from liblaf.actions import toolkit, utils
from liblaf.actions.toolkit import core

from . import Client, Inputs


@utils.action()
async def main(inputs: Inputs) -> None:
    gh: githubkit.GitHub = toolkit.github.get_octokit()
    client = Client(gh, *inputs.repo.split("/"))
    create: bool = False
    cksums_local: dict[str, str] = utils.cksum.hash_files(
        *inputs.files, hasher=inputs.hasher
    )
    if await client.release_exists(inputs.tag):
        cksums_remote: dict[str, str] = await client.release_cksums(
            inputs.tag, inputs.hasher
        )
        if cksums_local == cksums_remote:
            core.notice(f"Hashsums match, skip release: {inputs.tag}")
            return
        if inputs.clobber:
            core.notice(f"Recreate release: {inputs.tag}")
            await client.release_delete(inputs.tag)
            create = True
        else:
            core.notice(f"Update release: {inputs.tag}")
            await client.release_upload(inputs.tag, *inputs.files, hasher=inputs.hasher)
            await client.release_update(inputs.tag, body=inputs.changelog)
    else:
        create = True
        core.notice(f"Create release: {inputs.tag}")
    if create:
        await client.release_create(
            inputs.tag,
            *inputs.files,
            hasher=inputs.hasher,
            notes=inputs.changelog,
            prerelease=inputs.prerelease,
        )
