#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

function approve() {
  read -r json
  if [[ -z ${json-} ]]; then return; fi
  author="$(yq '.author.login' <<< "$json")"
  number="$(yq '.number' <<< "$json")"
  review_decision="$(yq '.reviewDecision' <<< "$json")"
  echo "Author: $author"
  echo "Number: $number"
  echo "Review Decision: $review_decision"
  # shellcheck disable=SC1087
  if grep --extended-regexp --quiet "^[[:space:]]*$author[[:space:]]*$" <<< "$INPUT_AUTHORS"; then
    if [[ $review_decision == 'REVIEW_REQUIRED' ]]; then
      echo gh pr --repo "$INPUT_REPO" review "$number" --approve
    fi
  fi
}

if [[ -n ${INPUT_PR_NUMBER-} ]]; then
  gh pr --repo "$INPUT_REPO" view "$INPUT_PR_NUMBER" \
    --json 'author,number,reviewDecision' |
    approve
else
  gh pr --repo "$INPUT_REPO" list \
    --json 'author,number,reviewDecision' |
    while read -r json; do
      approve <<< "$json"
    done
fi
