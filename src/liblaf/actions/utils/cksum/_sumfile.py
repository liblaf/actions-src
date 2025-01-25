import os
from pathlib import Path

from liblaf.actions import utils


def parse(text: str | bytes) -> dict[str, str]:
    result: dict[str, str] = {}
    for line in utils.splitlines(text if isinstance(text, str) else text.decode()):
        hashsum: str
        filename: str
        hashsum, filename = line.split()
        result[filename] = hashsum
    return result


def dumps(data: dict[str, str]) -> str:
    text: str = ""
    for filename, hashsum in sorted(data.items()):
        text += f"{hashsum}  {filename}\n"
    return text


def dump(data: dict[str, str], fpath: str | os.PathLike[str]) -> None:
    fpath = Path(fpath)
    fpath.write_text(dumps(data))
