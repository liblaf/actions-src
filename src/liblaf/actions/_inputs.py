import pydantic_settings as ps


class Inputs(ps.BaseSettings):
    model_config = ps.SettingsConfigDict(env_prefix="INPUT_", cli_parse_args=True)
