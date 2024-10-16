#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

copier=(pipx run --pip-args cookiecutter copier)
readarray -t answers_files < <(find .github/copier/ -iname ".copier-answers.*")

for answers_file in "${answers_files[@]}"; do
  "${copier[@]}" update --trust --answers-file "$answers_file" --defaults
done
