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
number=$("${args[@]}")
if [[ -z $number ]]; then
  echo "::notice::No PR Found"
  exit
fi
echo "::notice::Found PR Number: $number"
gh pr --repo "$INPUT_REPO" edit "$number" --add-label "$INPUT_ADD_LABEL"
