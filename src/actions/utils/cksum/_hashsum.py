import functools
import hashlib
from pathlib import Path

from actions.typing import StrPath


def hash_bytes(data: bytes, algo: str) -> str:
    hasher: hashlib._Hash = hashlib.new(algo)
    hasher.update(data)
    return hasher.hexdigest()


@functools.lru_cache
def hash_file(fpath: StrPath, algo: str) -> str:
    fpath = Path(fpath)
    with fpath.open("rb") as fp:
        hasher: hashlib._Hash = hashlib.file_digest(fp, algo)
        return hasher.hexdigest()


def hash_files(*files: StrPath, algo: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for _file in files:
        fpath = Path(_file)
        result[fpath.name] = hash_file(fpath, algo)
    return result
