from pathlib import Path

import actions
from actions.typing import StrPath


def parse(text: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for line in actions.utils.splitlines(text):
        hashsum: str
        filename: str
        hashsum, filename = line.split()
        result[filename] = hashsum
    return result


def dumps(data: dict[str, str]) -> str:
    text: str = ""
    for filename, hashsum in data.items():
        text += f"{filename}  {hashsum}\n"
    return text


def dump(data: dict[str, str], fpath: StrPath) -> None:
    fpath: Path = Path(fpath)
    fpath.write_text(dumps(data))
