# GitHub App Authentication Action

This GitHub Action allows you to authenticate with a GitHub App and generate an installation access token for specified repositories. The action is useful for automating workflows that require GitHub App authentication.

## Usage

To use this action in your workflow, you need to provide the GitHub App ID and private key as inputs. Optionally, you can specify the owner and repositories for which the token should be generated.

### Example Workflow

```yaml
name: Authenticate with GitHub App

on: [push]

jobs:
  authenticate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Authenticate with GitHub App
        uses: liblaf/actions/auth-app@main
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.PRIVATE_KEY }}
          owner: ${{ github.repository_owner }}
          repositories: ${{ github.repository }}
```

### Inputs

| Input Name     | Description                                                                                                                      | Required | Default Value                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------- |
| `app-id`       | The ID of the GitHub App.                                                                                                        | Yes      |                                  |
| `private-key`  | The private key of the GitHub App.                                                                                               | Yes      |                                  |
| `owner`        | The owner of the GitHub App installation (defaults to current repository owner).                                                 | No       | `${{ github.repository_owner }}` |
| `repositories` | Comma or newline-separated list of repositories to install the GitHub App on (defaults to current repository if owner is unset). | No       | `${{ github.repository }}`       |

### Outputs

| Output Name         | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `token`             | GitHub installation access token.                                                                  |
| `installation-id`   | GitHub App installation ID.                                                                        |
| `app-slug`          | GitHub App slug.                                                                                   |
| `commit-user-name`  | Name used for the commit user.                                                                     |
| `commit-user-email` | Email address used for the commit user.                                                            |
| `commit-author`     | Value used for the commit author. Defaults to the username of whoever triggered this workflow run. |

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
