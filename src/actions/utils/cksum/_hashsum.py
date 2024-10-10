import functools
import hashlib
from pathlib import Path

from actions.typing import StrPath


def hash_bytes(data: bytes, hasher: str) -> str:
    hasher: hashlib._Hash = hashlib.new(hasher)
    hasher.update(data)
    return hasher.hexdigest()


@functools.lru_cache
def hash_file(fpath: StrPath, hasher: str) -> str:
    fpath = Path(fpath)
    with fpath.open("rb") as fp:
        hasher: hashlib._Hash = hashlib.file_digest(fp, hasher)
        return hasher.hexdigest()


def hash_files(*files: StrPath, hasher: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for _file in files:
        fpath = Path(_file)
        result[fpath.name] = hash_file(fpath, hasher)
    return result
