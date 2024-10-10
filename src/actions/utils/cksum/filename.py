from pathlib import Path

from actions.typing import StrPath

FILENAMES: dict[str, str] = {
    "blake2b": "b2sums.txt",
}


def sums(algo: str) -> str:
    if algo in FILENAMES:
        return FILENAMES[algo]
    return algo + "sums.txt"


def single(fpath: StrPath, algo: str) -> str:
    fpath: Path = Path(fpath)
    return fpath.name + "." + algo
