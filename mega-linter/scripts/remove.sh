#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

readarray -t FILES_TO_REMOVE -r <<< "$REMOVE"
for file in "${FILES_TO_REMOVE[@]}"; do
  rm --force --verbose "$file"
done
