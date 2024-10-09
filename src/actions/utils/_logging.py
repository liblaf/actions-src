import inspect
import logging
import sys

import rich.traceback
from loguru import logger

import actions


class InterceptHandler(logging.Handler):
    """Intercept standard logging messages toward your Loguru sinks.

    References:
        1. [Overview — loguru documentation](https://loguru.readthedocs.io/en/stable/overview.html#entirely-compatible-with-standard-logging)
    """

    def emit(self, record: logging.LogRecord) -> None:
        # Get corresponding Loguru level if it exists.
        level: str | int
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message.
        frame, depth = inspect.currentframe(), 0
        while frame and (depth == 0 or frame.f_code.co_filename == logging.__file__):
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def init_logging(level: str | int = logging.NOTSET) -> None:
    rich.traceback.install(show_locals=True)
    if isinstance(level, int):
        level = logging.getLevelName(level)
    if level in (logging.NOTSET, "NOTSET"):
        level = "DEBUG" if actions.utils.get_bool_env("RUNNER_DEBUG") else "INFO"
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
    logger.remove()
    logger.add(sys.stderr, level=level)
