import githubkit
from environs import env


def get_octokit() -> githubkit.GitHub:
    token: str | None = (
        env.str("INPUT_TOKEN", None)
        or env.str("INPUT_GITHUB_TOKEN", None)
        or env.str("GH_TOKEN", None)
        or env.str("GITHUB_TOKEN", None)
    )
    return githubkit.GitHub(token)
