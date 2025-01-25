#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

IFS=" " read -a MISSING_LINTER_RULES -r <<< "$MISSING_LINTER_RULES"
for rule in "${MISSING_LINTER_RULES[@]}"; do
  rm --force --verbose ".github/linters/$rule"
done

if [[ $MISSING_MEGALINTER_CONFIG == "true" ]]; then
  rm --force --verbose ".mega-linter.yml"
fi
