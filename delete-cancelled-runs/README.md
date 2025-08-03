# Delete Cancelled Runs

## Example Usage

```yaml
concurrency:
  group: ${{ github.workflow }}@${{ github.ref }}
  cancel-in-progress: true

jobs:
  delete-cancelled-runs:
    name: Delete Cancelled Runs
    permissions:
      actions: write
    runs-on: ubuntu-latest
    steps:
      - name: Delete Cancelled Runs
        uses: liblaf/actions/delete-cancelled-runs@main
```

### Credits

- [MercuryTechnologies/delete-cancelled-runs](https://github.com/MercuryTechnologies/delete-cancelled-runs) - Deletes cancelled runs for a given workflow
