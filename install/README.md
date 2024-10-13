# Install Action

This GitHub Action allows you to install software packages using various package managers (APT, Homebrew, Chocolatey, eget, Linuxbrew, NPM, and pipx) based on the operating system and inputs provided. It supports Linux, macOS, and Windows, and can be configured to use a GitHub token for authenticated downloads.

## Usage

To use this action in your workflow, specify the packages you want to install using the appropriate package manager for your operating system.

### Example Workflow

```yaml
name: Install Packages

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install Packages
        uses: liblaf/actions/install@main
        with:
          apt: "package1 package2"
          brew: "package3 package4"
          choco: "package5 package6"
          eget: "package7 package8"
          linuxbrew: "package9 package10"
          npm: "package11 package12"
          pipx: "package13 package14"
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

| Input Name  | Description                               | Required | Default Value         |
| ----------- | ----------------------------------------- | -------- | --------------------- |
| `apt`       | APT packages to install.                  | No       |                       |
| `brew`      | Homebrew packages to install.             | No       |                       |
| `choco`     | Chocolatey packages to install.           | No       |                       |
| `eget`      | Eget packages to install.                 | No       |                       |
| `linuxbrew` | Linuxbrew packages to install.            | No       |                       |
| `npm`       | NPM packages to install.                  | No       |                       |
| `pipx`      | pipx packages to install.                 | No       |                       |
| `token`     | GitHub token for authenticated downloads. | No       | `${{ github.token }}` |

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
