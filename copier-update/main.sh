#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

copier=(pipx run)
specs=(cookiecutter copier)
for spec in "${specs[@]}"; do
  copier+=(--spec "$spec")
done
copier+=(copier)

readarray -t answers_files < <(find .github/copier/ -iname ".copier-answers.*")

for answers_file in "${answers_files[@]}"; do
  "${copier[@]}" update --trust --answers-file "$answers_file" --defaults
done
