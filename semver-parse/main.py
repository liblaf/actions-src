# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "liblaf-actions",
#     "semver",
# ]
# ///
import semver

from liblaf import actions
from liblaf.actions import core


class Inputs(actions.Inputs):
    version: str


async def main(inputs: Inputs) -> None:
    version: semver.Version = semver.Version.parse(inputs.version)
    core.set_output("major", version.major)
    core.set_output("minor", version.minor)
    core.set_output("patch", version.patch)
    core.set_output("prerelease", version.prerelease)
    core.set_output("build", version.build)


if __name__ == "__main__":
    actions.run(main)
