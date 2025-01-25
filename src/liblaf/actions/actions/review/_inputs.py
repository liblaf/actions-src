import functools

import pydantic_settings as ps
from loguru import logger

from liblaf.actions.toolkit import core


class Inputs(ps.BaseSettings):
    model_config = ps.SettingsConfigDict(env_prefix="INPUT_")

    repo: str

    @functools.cached_property
    def author(self) -> list[str]:
        authors: list[str] = core.get_multiline_input("AUTHOR")
        logger.info("Authors:\n{}", "\n".join(authors))
        return authors
