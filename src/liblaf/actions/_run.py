import asyncio
from typing import Protocol, get_type_hints

from liblaf import grapes

from . import Inputs


class ActionFunction[T: Inputs](Protocol):
    async def __call__(self, inputs: T) -> None: ...


def run[T: Inputs](func: ActionFunction[T]) -> None:
    grapes.init_logging()
    type_hints: dict[str, type[T]] = get_type_hints(func)
    cls: type[T] = type_hints["inputs"]
    inputs: T = cls()
    asyncio.run(func(inputs))
