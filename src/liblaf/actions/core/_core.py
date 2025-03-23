from pathlib import Path
from typing import Any

from environs import Env, env

from liblaf import actions

input_env = Env(prefix="INPUT_")


def get_input(name: str) -> str:
    val: str = input_env.str(name.replace(" ", "_").upper(), "")
    return val.strip()


def get_multiline_input(name: str) -> list[str]:
    return list(actions.utils.splitlines(get_input(name)))


def notice(message: str) -> None:
    print(f"::notice::{message}")


def set_output(name: str, value: Any, *, delimiter: str = "EOF") -> None:
    fpath: Path = env.path("GITHUB_OUTPUT")
    value = str(value)
    with fpath.open("a") as fp:
        if "\n" in value:
            # ref: <https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#multiline-strings>
            fp.write(f"{name}<<{delimiter}\n{value}\n{delimiter}\n")
        else:
            fp.write(f"{name}={value}\n")
