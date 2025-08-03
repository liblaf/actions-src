# Approve

## Example Usage

```yaml
jobs:
  auto-approve:
    name: Auto Approve
    runs-on: ubuntu-latest
    steps:
      - name: Auto Approve Renovate
        uses: liblaf/actions/approve@main
        with:
          authors: app/renovate
          filters: --app renovate --state open
          token: ${{ secrets.GH_PAT }}
```

```yaml
jobs:
  auto-approve:
    name: Auto Approve
    runs-on: ubuntu-latest
    steps:
      - name: Auto Approve Renovate
        uses: liblaf/actions/approve@main
        with:
          authors: app/renovate
          pr-number: ${{ github.event.pull_request.number || github.event.pull_request_review.pull_request.number }}
          token: ${{ secrets.GH_PAT }}
```
