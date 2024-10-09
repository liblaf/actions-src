import functools
import hashlib
from pathlib import Path

from actions.typing import StrPath


def hashsum(*files: StrPath, algo: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for _file in files:
        fpath = Path(_file)
        result[fpath.name] = hashsum_single(fpath, algo)
    return result


@functools.lru_cache
def hashsum_single(fpath: StrPath, algo: str) -> str:
    fpath = Path(fpath)
    with fpath.open("rb") as fp:
        hasher: hashlib._Hash = hashlib.file_digest(fp, algo)
        return hasher.hexdigest()
