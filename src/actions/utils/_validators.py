from typing import Any

import pydantic


def as_bool(obj: Any) -> bool:
    adapter = pydantic.TypeAdapter(bool)
    return adapter.validate_python(obj)
