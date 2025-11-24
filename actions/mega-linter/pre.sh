#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

LINTER_RULES_PATH='tmp.6NE8UxMvCk/linters'

MISSING_FILES=()
while IFS= read -d '' -r file; do
  filename="$(basename -- "$file")"
  case "$filename" in
    .ruff.toml) if [[ -f $filename ]] || [[ -f "pyproject.toml" ]]; then continue; fi ;;
    *) if [[ -f $filename ]]; then continue; fi ;;
  esac
  cp --archive --no-target-directory --verbose "$file" "$filename"
  MISSING_FILES+=("$filename")
done < <(find "$LINTER_RULES_PATH" -type f -print0)

printf '%s\n' "${MISSING_FILES[@]}" > "$RUNNER_TEMP/missing-linter-files.list"
