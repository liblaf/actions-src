from pathlib import Path

from actions.typing import StrPath

FILENAMES: dict[str, str] = {
    "blake2b": "b2sums.txt",
}


def sums(hasher: str) -> str:
    if hasher in FILENAMES:
        return FILENAMES[hasher]
    return hasher + "sums.txt"


def single(fpath: StrPath, hasher: str) -> str:
    fpath: Path = Path(fpath)
    return fpath.name + "." + hasher
