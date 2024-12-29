#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

export FORCE_COLOR=1

copier=(pipx run --pip-args cookiecutter copier)
if [[ ! -d .github/copier/ ]]; then
  exit
fi
readarray -t answers_files < <(find .github/copier/ -iname ".copier-answers*")
for answers_file in "${answers_files[@]}"; do
  echo "::group::$answers_file"
  "${copier[@]}" update --skip-answered --trust --answers-file "$answers_file"
  echo "::endgroup::"
done
