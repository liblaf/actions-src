# Approve

## Example Usage

### Approve a specified PR

```yaml
name: Approve a specified PR

on:
  pull_request:

jobs:
  approve:
    runs-on: ubuntu-latest
    steps:
      - name: Approve Pull Request
        uses: liblaf/actions-ts/approve@dist
        with:
          authors: renovate[bot]
          pull-number: ${{ github.event.pull_request.number }}
          token: ${{ secrets.GH_PAT }}
```

### Approve all PRs in a specified repository

```yaml
name: Approve all PRs in a specified repository

on:
  schedule:
    - cron: "0 0 * * 0"

jobs:
  approve:
    runs-on: ubuntu-latest
    steps:
      - name: Approve Pull Request
        uses: liblaf/actions-ts/approve@dist
        with:
          authors: renovate[bot]
          repository: ${{ github.repository }}
          token: ${{ secrets.GH_PAT }}
```

### Approve all PRs in all repositories for a specified user

```yaml
name: Approve all PRs in all repositories for the specified user

on:
  schedule:
    - cron: "0 0 * * 0"

jobs:
  approve:
    runs-on: ubuntu-latest
    steps:
      - name: Approve Pull Request
        uses: liblaf/actions-ts/approve@dist
        with:
          authors: renovate[bot]
          repository: ${{ github.repository_owner }}
          token: ${{ secrets.GH_PAT }}
```
