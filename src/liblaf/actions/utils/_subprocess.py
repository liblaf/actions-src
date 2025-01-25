import asyncio
import asyncio.subprocess as asp
import os
import subprocess as sp
from typing import Literal, overload

type StrPath = str | os.PathLike[str]


@overload
async def run(
    *args: StrPath, capture_stdout: Literal[False] = False, text: bool = False
) -> None: ...
@overload
async def run(
    *args: StrPath, capture_stdout: Literal[True], text: Literal[False] = False
) -> bytes: ...
@overload
async def run(
    *args: StrPath, capture_stdout: Literal[True], text: Literal[True]
) -> str: ...
async def run(
    *args: StrPath, capture_stdout: bool = False, text: bool = False
) -> str | bytes | None:
    proc: asp.Process = await asyncio.create_subprocess_exec(
        *[str(a) for a in args], stdout=asp.PIPE if capture_stdout else None
    )
    output: bytes = b""
    if capture_stdout:
        assert proc.stdout is not None
        output = await proc.stdout.read()
    returncode: int = await proc.wait()
    if returncode != 0:
        raise sp.CalledProcessError(returncode, args)
    if capture_stdout:
        if text:
            return output.decode()
        return output
    return None
