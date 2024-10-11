# GitHub Release Action

This GitHub Action automates the process of creating a release on GitHub, including generating a changelog, formatting it, and uploading specified assets. It supports options for clobbering existing releases, marking releases as prereleases, and computing hash sums for uploaded files. The action is designed to be flexible and customizable, allowing users to specify the repository, tag, and other parameters as needed.

## Features

- **Changelog Generation**: Automatically generates a changelog using `git-cliff`.
- **Changelog Formatting**: Formats the generated changelog using `prettier`.
- **Asset Upload**: Uploads specified assets to the release.
- **Customizable**: Allows customization of various parameters such as repository, tag, and release type.
- **Hash Sum Calculation**: Computes hash sums for uploaded assets using the specified digest algorithm.

## Inputs

### `clobber`

- **Description**: Recreate the release if it already exists.
- **Required**: No
- **Default**: `"false"`

### `files`

- **Description**: Newline-delimited list of path globs for asset files to upload.
- **Required**: No

### `hasher`

- **Description**: Compute hashsums using the specified digest algorithm.
- **Required**: No
- **Default**: `sha256`

### `prerelease`

- **Description**: Mark the release as a prerelease.
- **Required**: No
- **Default**: `"false"`

### `repo`

- **Description**: Repository name with owner.
- **Required**: No
- **Default**: `${{ github.repository }}`

### `tag`

- **Description**: Tag name.
- **Required**: Yes

### `token`

- **Description**: GitHub token.
- **Required**: No
- **Default**: `${{ github.token }}`

## Usage

To use this GitHub Action in your workflow, add the following step to your `.github/workflows/release.yml` file:

```yaml
name: Release

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Release
        uses: liblaf/actions/release@main
        with:
          clobber: "false"
          files: |
            dist/*.tar.gz
            dist/*.zip
          hasher: sha256
          prerelease: "false"
          repo: ${{ github.repository }}
          tag: ${{ github.ref_name }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Example

Here is a complete example of a GitHub Actions workflow that uses this action:

```yaml
name: Release

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Release
        uses: liblaf/actions/release@main
        with:
          clobber: "false"
          files: |
            dist/*.tar.gz
            dist/*.zip
          hasher: sha256
          prerelease: "false"
          repo: ${{ github.repository }}
          tag: ${{ github.ref_name }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](../CONTRIBUTING.md) to get started.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/liblaf/actions/issues).

## References

- <https://github.com/arvinxx/gitmoji-commit-workflow/blob/8f21e287ec3c3f5144f3a606a3c737bea6d67e80/packages/changelog/src/transformer/typeDisplayName.ts>
- <https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/238093090c14bd7d5151eb5316e635623ce633f9/versions/2.2.0/README.md>
- <https://github.com/conventional-changelog/conventional-changelog/blob/d3b8aaa16337993bbad4d91db1ffac5a7568756b/packages/conventional-changelog-conventionalcommits/src/constants.js>
