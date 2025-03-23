#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

export FORCE_COLOR=1

copier=(pipx run --pip-args cookiecutter copier)
readarray -t answers_files < <(find ".config/copier/" ".github/copier/" -iname ".copier-answers*")
for answers_file in "${answers_files[@]}"; do
  echo "::group::$answers_file"
  "${copier[@]}" recopy --trust --answers-file "$answers_file" --force
  echo "::endgroup::"
done
