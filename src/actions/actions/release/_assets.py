from collections.abc import Iterable
from pathlib import Path

from actions.ext.gh.release import GhRelease
from actions.typing import StrPath
from actions.utils import hashsum


def prepare_assets(
    tmpdir: StrPath, files: Iterable[StrPath], algo: str
) -> tuple[dict[str, str], list[Path]]:
    tmpdir: Path = Path(tmpdir)
    hashsums: dict[str, str] = hashsum.hashsum(*files, algo=algo)
    sumfile: Path = tmpdir / hashsum.filename(algo)
    hashsum.dump(hashsums, sumfile)
    for filename, hashvalue in hashsums.items():
        hashsumfile: Path = tmpdir / hashsum.filename_single(filename, algo)
        hashsum.dump({filename: hashvalue}, hashsumfile)
    return (
        hashsums,
        [Path(file) for file in files]
        + [sumfile]
        + [tmpdir / hashsum.filename_single(fpath, algo) for fpath in files],
    )


async def get_remote_hashsums(
    release: GhRelease, tag: str, algo: str
) -> dict[str, str]:
    text: str = await release.download(tag, pattern=hashsum.filename(algo))
    hashsums: dict[str, str] = hashsum.parse(text)
    return hashsums
