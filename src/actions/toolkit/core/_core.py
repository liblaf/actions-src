import os

import actions


def get_input(name: str) -> str:
    val: str = os.getenv("INPUT_" + name.replace(" ", "_").upper(), "")
    return val.strip()


def get_multiline_input(name: str) -> list[str]:
    return list(actions.utils.splitlines(get_input(name)))


def notice(message: str) -> None:
    print(f"::notice::{message}")
