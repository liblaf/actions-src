# Release Action

This GitHub Action automates the process of creating a release on GitHub. It includes generating a changelog, formatting it, and uploading specified assets. The action supports options for clobbering existing releases, marking releases as prereleases, and computing hash sums for uploaded files. The action is designed to be flexible and customizable, allowing users to specify the repository, tag, and other parameters as needed.

## Usage

To use this action in your workflow, specify the repository, tag, and other optional parameters such as clobbering, prerelease status, and hashing algorithm.

### Example Workflow

```yaml
name: Create Release

on: [push]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Create Release
        uses: liblaf/actions/release@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          tag: v1.0.0
          clobber: true
          prerelease: false
          hasher: sha256
          files: |
            dist/*.tar.gz
            dist/*.zip
```

### Inputs

| Input Name   | Description                                                     | Required | Default Value              |
| ------------ | --------------------------------------------------------------- | -------- | -------------------------- |
| `token`      | GitHub token.                                                   | No       | `${{ github.token }}`      |
| `tag`        | Tag name.                                                       | Yes      |                            |
| `clobber`    | Recreate the release if it already exists.                      | No       | `false`                    |
| `prerelease` | Mark the release as a prerelease.                               | No       | `false`                    |
| `hasher`     | Compute hashsums using the specified digest algorithm.          | No       | `sha256`                   |
| `files`      | Newline-delimited list of path globs for asset files to upload. | No       |                            |
| `repo`       | Repository name with owner.                                     | No       | `${{ github.repository }}` |

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
