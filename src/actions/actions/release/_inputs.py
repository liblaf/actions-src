import functools
import os
from pathlib import Path

from loguru import logger
from pydantic_settings import BaseSettings, SettingsConfigDict

from actions.toolkit import core


class Inputs(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="INPUT_")

    clobber: bool = False
    hasher: str = "sha256"
    prerelease: bool = False
    repo: str
    tag: str

    @functools.cached_property
    def changelog(self) -> str | None:
        fpath: Path = Path(core.get_input("CHANGELOG_FILE"))
        text: str = fpath.read_text().strip()
        _, _, text = text.partition("\n")
        if not text:
            return None
        text = text.strip()
        body: str = ""
        for line in text.splitlines():
            # skip commits
            if "sync with template repository" in line:
                continue
            body += line + "\n"
        return body

    @functools.cached_property
    def files(self) -> list[Path]:
        files: list[Path] = []
        cwd: Path
        if workspace := os.getenv("GITHUB_WORKSPACE"):
            cwd = Path(workspace)
        else:
            cwd = Path.cwd()
        for line in core.get_multiline_input("FILES"):
            files.extend(cwd.glob(line))
        logger.info("Files:\n{}", "\n".join([str(f) for f in files]))
        return files
