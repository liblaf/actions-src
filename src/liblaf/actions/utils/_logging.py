import logging

from environs import env

# make pyright happy
import liblaf.grapes as grapes  # noqa: PLR0402


def init_logging(level: str | int = logging.NOTSET) -> None:
    if level in (logging.NOTSET, "NOTSET"):
        level = "DEBUG" if env.bool("RUNNER_DEBUG", False) else "INFO"
    grapes.init_logging(level)
