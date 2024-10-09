import asyncio
import functools
import inspect
from collections.abc import Callable
from typing import Generic, Protocol, TypeVar

from pydantic_settings import BaseSettings

from actions import utils

_S_contra = TypeVar("_S_contra", bound=BaseSettings, contravariant=True)


class RawAction(Generic[_S_contra], Protocol):
    async def __call__(self, inputs: _S_contra) -> None: ...


class WrappedAction(Protocol):
    def __call__(self) -> None: ...


def action() -> Callable[[RawAction], WrappedAction]:
    def decorator(fn: RawAction[_S_contra]) -> WrappedAction:
        @functools.wraps(fn)
        def wrapped() -> None:
            utils.init_logging()
            sig: inspect.Signature = inspect.signature(fn)
            param: inspect.Parameter = next(iter(sig.parameters.values()))
            annotation: type[_S_contra] = param.annotation
            inputs: _S_contra = annotation()
            asyncio.run(fn(inputs))

        return wrapped

    return decorator
