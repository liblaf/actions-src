#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

args=(gh pr --repo "$INPUT_REPO" list --json number --jq '.[].number')
if [[ -n ${INPUT_APP-} ]]; then
  args+=(--app "$INPUT_APP")
fi
if [[ -n ${INPUT_LABEL-} ]]; then
  args+=(--label "$INPUT_LABEL")
fi
readarray -t number < <("${args[@]}")
if ((${#number[@]} == 0)); then
  echo "::notice::No pull requests match your search in $INPUT_REPO."
  exit
fi
for pr in "${number[@]}"; do
  gh pr --repo "$INPUT_REPO" edit "$pr" --add-label "$INPUT_ADD_LABEL"
  echo "::notice::Add '$INPUT_ADD_LABEL' to [$INPUT_REPO#$pr](https://github.com/$INPUT_REPO/pull/$pr)."
done
