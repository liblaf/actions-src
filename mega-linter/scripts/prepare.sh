#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

FILES_TO_REMOVE=()
LINTER_RULES=(
  .checkov.yml
  .devskim.json
  .ruff.toml
  kics.config
  pyrightconfig.json
)
LINTER_RULES_REMOTE="https://raw.githubusercontent.com/liblaf/.github/main/.github/linters/"
MEGALINTER_CONFIG_OPTIONS=(
  .mega-linter.yaml
  .config/.mega-linter.yaml
  .config/.mega-linter.yml
  .github/.mega-linter.yaml
  .github/.mega-linter.yml
  "$GITHUB_ACTION_PATH/.mega-linter.yaml"
)

for rule in "${LINTER_RULES[@]}"; do
  if [[ -f ".github/linters/$rule" ]]; then continue; fi
  mkdir --parents --verbose ".github/linters"
  if [[ -f ".config/linters/$rule" ]]; then
    cp --archive --force --no-target-directory --verbose ".config/linters/$rule" ".github/linters/$rule"
  else
    wget --output-document=".github/linters/$rule" "$LINTER_RULES_REMOTE/$rule"
  fi
  FILES_TO_REMOVE+=(".github/linters/$rule")
done

if [[ ! -f ".mega-linter.yml" ]]; then
  FILES_TO_REMOVE+=(".mega-linter.yml")
  for config in "${MEGALINTER_CONFIG_OPTIONS[@]}"; do
    if [[ -f $config ]]; then
      cp --archive --force --no-target-directory --verbose "$config" ".mega-linter.yml"
      break
    fi
  done
fi

{
  echo "remove<<EOF"
  printf "%s\n" "${FILES_TO_REMOVE[@]}"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
