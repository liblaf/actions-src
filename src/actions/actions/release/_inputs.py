import functools
import re
from pathlib import Path

import pydantic_settings as ps
from loguru import logger

from actions.toolkit import core


class Inputs(ps.BaseSettings):
    model_config = ps.SettingsConfigDict(env_prefix="INPUT_")

    clobber: bool = False
    hasher: str = "sha256"
    prerelease: bool = False
    repo: str
    tag: str

    @functools.cached_property
    def changelog(self) -> str | None:
        fpath: Path = Path(core.get_input("CHANGELOG_FILE"))
        if not fpath.exists():
            return None
        text: str = fpath.read_text().strip()
        _, _, text = text.partition("\n")
        if not text:
            return None
        text = text.strip()
        body: str = ""
        for line in text.splitlines():
            # skip commits
            if re.search("sync with (template repository|repository template)", line):
                continue
            body += line + "\n"
        return body

    @functools.cached_property
    def files(self) -> list[Path]:
        files: list[Path] = []
        for line in core.get_multiline_input("FILES"):
            files.extend(Path.cwd().glob(line))
        logger.info("Files:\n{}", "\n".join([str(f) for f in files]))
        return files
