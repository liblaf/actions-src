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
echo "::notice::Found PR number: $number"
gh pr --repo "$INPUT_REPO" edit "$number" --add-label "$INPUT_ADD_LABEL"
