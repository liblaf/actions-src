# Install GitHub Action

The **Install GitHub Action** is a versatile tool designed to simplify the installation of software packages across different operating systems using various package managers. It supports Linux, macOS, and Windows, and integrates seamlessly with popular package managers like APT, Homebrew, Chocolatey, eget, Linuxbrew, NPM, and pipx.

## Features

- **Multi-Platform Support**: Automatically detects the operating system (Linux, macOS, Windows) and uses the appropriate package manager.
- **Multiple Package Managers**: Supports APT, Homebrew, Chocolatey, eget, Linuxbrew, NPM, and pipx.
- **Customizable**: Allows you to specify which packages to install via inputs.
- **Secure**: Optionally uses a GitHub token for authenticated downloads with eget.

## Usage

To use this action in your GitHub workflow, add the following step to your workflow file:

```yaml
steps:
  - name: Install Packages
    uses: liblaf/actions/install@main
    with:
      apt: "package1 package2" # Example for APT
      brew: "package3 package4" # Example for Homebrew
      choco: "package5 package6" # Example for Chocolatey
      eget: "user/repo" # Example for eget
      linuxbrew: "package7" # Example for Linuxbrew
      npm: "package8" # Example for NPM
      pipx: "package9" # Example for pipx
      token: ${{ secrets.GITHUB_TOKEN }} # Optional GitHub token
```

### Inputs

| Input       | Description                              | Required | Default               |
| ----------- | ---------------------------------------- | -------- | --------------------- |
| `apt`       | Packages to install via APT              | No       |                       |
| `brew`      | Packages to install via Homebrew         | No       |                       |
| `choco`     | Packages to install via Chocolatey       | No       |                       |
| `eget`      | Packages to install via eget             | No       |                       |
| `linuxbrew` | Packages to install via Linuxbrew        | No       |                       |
| `npm`       | Packages to install via NPM              | No       |                       |
| `pipx`      | Packages to install via pipx             | No       |                       |
| `token`     | GitHub token for authenticated downloads | No       | `${{ github.token }}` |

## Examples

### Example 1: Installing Packages on Linux

```yaml
steps:
  - name: Install Packages on Linux
    uses: liblaf/actions/install@main
    with:
      apt: "git curl"
      linuxbrew: "some-package"
      npm: "typescript"
      pipx: "black"
```

### Example 2: Installing Packages on macOS

```yaml
steps:
  - name: Install Packages on macOS
    uses: liblaf/actions/install@main
    with:
      brew: "wget jq"
      npm: "eslint"
      pipx: "isort"
```

### Example 3: Installing Packages on Windows

```yaml
steps:
  - name: Install Packages on Windows
    uses: liblaf/actions/install@main
    with:
      choco: "git vscode"
      npm: "yarn"
      pipx: "flake8"
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

For more information, visit the [GitHub repository](https://github.com/liblaf/actions).
