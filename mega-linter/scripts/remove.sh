#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

IFS=" " read -a MISSING_LINTER_RULES -r <<< "$MISSING_LINTER_RULES"
for rule in "${MISSING_LINTER_RULES[@]}"; do
  rm --force --verbose ".github/linters/$rule"
done
