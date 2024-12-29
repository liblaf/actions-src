import functools

from loguru import logger
from pydantic_settings import BaseSettings, SettingsConfigDict

from actions.toolkit import core


class Inputs(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="INPUT_")

    repo: str
    token: str

    @functools.cached_property
    def author(self) -> list[str]:
        authors: list[str] = core.get_multiline_input("AUTHOR")
        logger.info("Authors:\n{}", "\n".join(authors))
        return authors
