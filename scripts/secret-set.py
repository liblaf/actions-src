import asyncio
import asyncio.subprocess as asp
import base64
import subprocess as sp
from collections.abc import AsyncGenerator, Mapping
from typing import Annotated

import githubkit
import nacl.encoding
import nacl.public
import typer
from githubkit.versions.latest import models
from loguru import logger


def encrypt(public_key: str, secret_value: str) -> str:
    """Encrypt a Unicode string using the public key.

    References:
        1. [Example encrypting a secret using Python](https://docs.github.com/en/rest/guides/encrypting-secrets-for-the-rest-api#example-encrypting-a-secret-using-python)
    """
    public_key: nacl.public.PublicKey = nacl.public.PublicKey(
        public_key.encode("utf-8"),
        nacl.encoding.Base64Encoder(),  # pyright: ignore[reportArgumentType]
    )
    sealed_box = nacl.public.SealedBox(public_key)
    encrypted: bytes = sealed_box.encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")


async def list_repos(gh: githubkit.GitHub) -> AsyncGenerator[models.Repository]:
    async for repo in gh.paginate(
        gh.rest.repos.async_list_for_authenticated_user,
        visibility="public",
        affiliation="owner",
    ):
        if repo.private or repo.fork or repo.archived or repo.disabled:
            continue
        yield repo


async def rbw_get(needle: str, field: str) -> str:
    cmd: list[str] = ["rbw", "get", "--field", field, needle]
    proc: asp.Process = await asp.create_subprocess_exec(
        *cmd, stdin=None, stdout=asp.PIPE, stderr=None
    )
    assert proc.stdout is not None
    raw: bytes = await proc.stdout.read()
    returncode: int = await proc.wait()
    if returncode != 0:
        raise sp.CalledProcessError(returncode, cmd)
    return raw.decode().strip()


async def set_secrets(
    gh: githubkit.GitHub, repo: models.Repository, secrets: Mapping[str, str]
) -> None:
    public_key: models.ActionsPublicKey = (
        await gh.rest.actions.async_get_repo_public_key(
            owner=repo.owner.login, repo=repo.name
        )
    ).parsed_data
    for name, value in secrets.items():
        await gh.rest.actions.async_create_or_update_repo_secret(
            owner=repo.owner.login,
            repo=repo.name,
            secret_name=name,
            encrypted_value=encrypt(public_key.key, value),
            key_id=public_key.key_id,
        )
        logger.success(
            "Set Actions secret `{}` for `{}/{}`", name, repo.owner.login, repo.name
        )


async def main(token: str) -> None:
    gh = githubkit.GitHub(token)
    secrets: dict[str, str] = {
        "CARGO_REGISTRY_TOKEN": await rbw_get("crates.io", "TOKEN"),
        "GH_APP_ID": await rbw_get("GitHub App", "APP_ID"),
        "GH_APP_PRIVATE_KEY": await rbw_get("GitHub App", "notes"),
        "GH_PAT": await rbw_get("GitHub", "PAT"),
        "NPM_TOKEN": await rbw_get("npm", "TOKEN"),
    }
    repos: list[models.Repository] = [repo async for repo in list_repos(gh)]
    await asyncio.gather(*(set_secrets(gh, repo, secrets) for repo in repos))


def cli(
    token: Annotated[
        str,
        typer.Option("-t", "--token", envvar=["GH_PAT", "GH_TOKEN", "GITHUB_TOKEN"]),
    ],
) -> None:
    asyncio.run(main(token=token))


if __name__ == "__main__":
    typer.run(cli)
