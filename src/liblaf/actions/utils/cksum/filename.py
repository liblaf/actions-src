import os
from pathlib import Path

from . import DEFAULT_HASHER

FILENAMES: dict[str, str] = {
    "blake2b": "b2sums.txt",
}


def sums(hasher: str = DEFAULT_HASHER) -> str:
    if hasher in FILENAMES:
        return FILENAMES[hasher]
    return hasher + "sums.txt"


def single(fpath: str | os.PathLike[str], hasher: str = DEFAULT_HASHER) -> str:
    fpath: Path = Path(fpath)
    return fpath.name + "." + hasher
