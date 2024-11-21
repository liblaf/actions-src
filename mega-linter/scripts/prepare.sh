#!/bin/bash
set -o errexit -o nounset -o pipefail

LINTER_RULES_PATH="https://github.com/liblaf/.github/raw/refs/heads/main/.github/linters"
LINTER_RULES=(
  .checkov.yml
  .devskim.json
  .ruff.toml
  kics.config
  pyrightconfig.json
)
MISSING_LINTER_RULES=()

BRIGHT_RED="\x1b[91m"
BRIGHT_GREEN="\x1b[92m"
RESET="\x1b[0m"

function download() {
  local_path=".github/linters/$1"
  remote_path="$LINTER_RULES_PATH/$1"
  if [[ -f ".github/linters/$1" ]]; then
    return
  fi
  MISSING_LINTER_RULES+=("$1")
  mkdir --parents --verbose ".github/linters"
  if wget --output-document="$local_path" "$remote_path"; then
    printf "${BRIGHT_GREEN}SAVED: %s${RESET}\n" "$local_path"
  else
    printf "${BRIGHT_RED}DOWNLOAD ERROR: %s${RESET}\n" "$local_path"
    rm --force "$local_path"
  fi
}

for rule in "${LINTER_RULES[@]}"; do
  download "$rule"
done

echo "MISSING_LINTER_RULES=${MISSING_LINTER_RULES[*]}" >> "$GITHUB_ENV"
