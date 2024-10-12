from pydantic_settings import BaseSettings, SettingsConfigDict


class Inputs(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="INPUT_")

    app_id: str
    private_key: str
