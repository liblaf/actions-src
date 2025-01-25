import functools
import hashlib
import os
from pathlib import Path

from . import DEFAULT_HASHER


def hash_bytes(data: bytes, hasher: str = DEFAULT_HASHER) -> str:
    hasher: hashlib._Hash = hashlib.new(hasher)
    hasher.update(data)
    return hasher.hexdigest()


@functools.lru_cache
def hash_file(fpath: str | os.PathLike[str], hasher: str = DEFAULT_HASHER) -> str:
    fpath = Path(fpath)
    with fpath.open("rb") as fp:
        hasher: hashlib._Hash = hashlib.file_digest(fp, hasher)
        return hasher.hexdigest()


def hash_files(
    *files: str | os.PathLike[str], hasher: str = DEFAULT_HASHER
) -> dict[str, str]:
    result: dict[str, str] = {}
    for _file in files:
        fpath = Path(_file)
        result[fpath.name] = hash_file(fpath, hasher)
    return result
