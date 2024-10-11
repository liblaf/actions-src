import os
from pathlib import Path

bin_dir: Path = Path("~/.local/bin").expanduser()
bin_dir.mkdir(parents=True, exist_ok=True)
if github_path_str := os.getenv("GITHUB_PATH"):
    github_path: Path = Path(github_path_str)
    with github_path.open("a") as fp:
        fp.write(f"{bin_dir}\n")
