from actions.typing import StrPath

FILENAMES: dict[str, str] = {
    "blake2b": "b2sums.txt",
}


def filename(algo: str) -> str:
    if algo in FILENAMES:
        return FILENAMES[algo]
    return algo + "sums.txt"


def filename_single(fpath: StrPath, algo: str) -> str:
    return str(fpath) + "." + algo
