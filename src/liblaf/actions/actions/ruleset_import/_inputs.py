import pydantic_settings as ps


class Inputs(ps.BaseSettings):
    model_config = ps.SettingsConfigDict(env_prefix="INPUT_")

    repo: str
    source_repo: str
    source_ruleset_id: int
