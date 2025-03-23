#!/bin/bash
# shellcheck disable=SC2034
set -o errexit
set -o nounset
set -o pipefail

readarray -t repos < <(
  gh repo list "${OWNER-}" \
    --jq ".[].nameWithOwner" \
    --json "nameWithOwner" \
    --limit 1000 \
    --no-archived \
    --source
)

CARGO_REGISTRY_TOKEN="$(rbw get --field "TOKEN" "crates.io")"
GH_APP_ID="$(rbw get --field "APP_ID" "GitHub App")"
GH_APP_PRIVATE_KEY="$(rbw get --field "notes" "GitHub App")"
GH_PAT="$(rbw get --field "PAT" "GitHub")"
NPM_TOKEN="$(rbw get --field "TOKEN" "npm")"

for repo in "${repos[@]}"; do
  for secret in CARGO_REGISTRY_TOKEN GH_APP_ID GH_APP_PRIVATE_KEY GH_PAT NPM_TOKEN; do
    gh secret --repo "$repo" set "$secret" --body "${!secret}"
  done
done
