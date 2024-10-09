import os

import actions


def get_bool_env(key: str, default: bool = False) -> bool:  # noqa: FBT001,FBT002
    return actions.utils.as_bool(os.getenv(key, default))
