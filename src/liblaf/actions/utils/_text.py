from collections.abc import Generator


def splitlines(s: str) -> Generator[str]:
    for line in s.strip().splitlines():
        line_stripped: str = line.strip()
        if line_stripped:
            yield line_stripped
