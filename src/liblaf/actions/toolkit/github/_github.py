import githubkit
from environs import env


def get_octokit() -> githubkit.GitHub:
    token: str = (
        env.str("INPUT_TOKEN", None)
        or env.str("INPUT_GITHUB_TOKEN")
        or env.str("GH_TOKEN")
        or env.str("GITHUB_TOKEN")
    )
    return githubkit.GitHub(token)
