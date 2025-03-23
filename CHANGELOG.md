# Changelog

## [0.1.1](https://github.com/liblaf/actions/compare/v0.1.0...v0.1.1) (2025-03-23)


### 🐛 Bug Fixes

* **release:** re-enable checksum calculation for assets ([4b3ca45](https://github.com/liblaf/actions/commit/4b3ca458244739ab8e98a09e37660f92721960fb))

## [0.1.0] - 2025-03-23

### ✨ Features

- **app-list-repos:** implement GitHub App repository listing feature - ([333a829](https://github.com/liblaf/actions/commit/333a829e68e256eb75904448a7d40c427d0948cf))
- **auth-app:** add GitHub App authentication workflow - ([d0d2fd3](https://github.com/liblaf/actions/commit/d0d2fd38d9c0eb7f888f0480924e3305591a1d89))
- **auto-merge:** add GitHub Action to automate merging of Release Please PRs - ([911e0a5](https://github.com/liblaf/actions/commit/911e0a5415ed4c451f8f8bda858ec8502994f921))
- **changelog:** add GitHub action for generating changelog using git-cliff - ([7d061db](https://github.com/liblaf/actions/commit/7d061db30b3a128532bbfe440f8d33f5d7a2e159))
- **copier-update:** automate template updates across repositories - ([60cc90b](https://github.com/liblaf/actions/commit/60cc90b0ce80b080f61b52a81d64d9e7b269c3d1))
- **install:** add GitHub Actions workflow for multi-platform package installation - ([402f1fa](https://github.com/liblaf/actions/commit/402f1fa809d8cabc096464e0dcba2ce5a520067d))
- **schedule:** add workflow dispatch for sync.yaml - ([a125fbf](https://github.com/liblaf/actions/commit/a125fbf0a4a7a3ad94f869db1c65f8b3c2adc64b))
- **schedule:** automate release and sync workflows with GitHub Actions - ([b50251e](https://github.com/liblaf/actions/commit/b50251ecac3c5286b94f91ce9faf962d6f077e5e))
- **scripts:** add Python-based secret management script - ([be4ca5d](https://github.com/liblaf/actions/commit/be4ca5dee700919e33516492ff787a7f62980251))
- **setup-python:** add optional python-version input for uv setup - ([4a19421](https://github.com/liblaf/actions/commit/4a1942101bdb14c393676435eac33baa0fce44aa))
- add ruleset-import action for managing repository rulesets - ([f532ef0](https://github.com/liblaf/actions/commit/f532ef05b08bbce2fb4f38243bdfd296f033c81b))
- add GitHub Action for labeling pull requests - ([55cb2b1](https://github.com/liblaf/actions/commit/55cb2b1cb1426939566f4bf398eebe1a7ca3958c))
- add auto-review action for automated pull request approvals - ([4e73649](https://github.com/liblaf/actions/commit/4e7364911ce5998777d6d8d68f1b6003f4b6a4d8))
- initialize project structure and configuration - ([116aa7a](https://github.com/liblaf/actions/commit/116aa7a3196822f06addf3dd91fecd591947926d))

### 🐛 Bug Fixes

- **app-list-repos:** add missing environment variables for repository listing - ([d7eff9c](https://github.com/liblaf/actions/commit/d7eff9cc8ab800915a0ca4484ae4c4012da38a8c))
- **auto-merge:** prevent script from continuing when no PR is found - ([7939206](https://github.com/liblaf/actions/commit/7939206c970490badcdea326a434fdb808859a84))
- **bot/schedule:** refactor workflow dispatch and update environment variable names - ([d64b3b1](https://github.com/liblaf/actions/commit/d64b3b1f139fb38b0eb7f2b9da2b9b31ab095729))
- **copier-update:** simplify copier command invocation - ([60790f7](https://github.com/liblaf/actions/commit/60790f7bd2d9aa65881a449e23ba5f1ed2be3192))
- **logging:** set default value for RUNNER_DEBUG env var - ([c464586](https://github.com/liblaf/actions/commit/c464586b56b8c8d063cef53d0ccaac55af89426e))
- **release:** ensure release exists before upload - ([39570bd](https://github.com/liblaf/actions/commit/39570bdee9068200131fe9d3875c8964da51c8d4))
- **release:** correct conditional logic for changelog generation - ([bba81a0](https://github.com/liblaf/actions/commit/bba81a0126f72610b5a164f09bab6cf78ea98ea4))
- **release:** correct temporary directory path and add cleanup step - ([afba739](https://github.com/liblaf/actions/commit/afba73927db2ef4f5e7262b23d5e6cb6cef53e44))
- **release:** rename hash algorithm input to avoid confusion - ([6c96743](https://github.com/liblaf/actions/commit/6c96743f6c88487a2549df285e9fd9a5fa740857))
- **release:** include algorithm in release upload and creation - ([fcff72c](https://github.com/liblaf/actions/commit/fcff72c3239f318887b7649816f1099e9d7377de))
- **release:** correct retrieval of remote checksum for existing releases - ([6efda78](https://github.com/liblaf/actions/commit/6efda7807d6ce9b5902efc5b18fb9cf9359d4a28))
- **release:** correct section titles and add missing types in changelog configuration - ([cae0f89](https://github.com/liblaf/actions/commit/cae0f892db29ecd64469f456db475f454e8deac7))
- **release:** correct environment variable name for GitHub token - ([2dd10da](https://github.com/liblaf/actions/commit/2dd10da3baae115716fae3c2c4e262e0eab3ac69))
- **release:** correct pipx command to use `run` instead of direct execution - ([e6ddb90](https://github.com/liblaf/actions/commit/e6ddb9080e8f75183d9cf588a6656c11e1c92c9a))
- **schedule:** exclude special repository from scheduled actions - ([89d6085](https://github.com/liblaf/actions/commit/89d6085f5e56417139fab3d9c716d603fa69c722))
- **toolkit:** correct base URL for release asset downloads - ([9fe47ae](https://github.com/liblaf/actions/commit/9fe47aebb1418be6bccbf9c8966137dff25f454f))
- adjust release tag deletion delay - ([96ca3e0](https://github.com/liblaf/actions/commit/96ca3e02475e1334d7b0232a51e1f0c91fb03a41))
- handle not found errors in release deletion - ([b351994](https://github.com/liblaf/actions/commit/b35199411f0423200986fd3898e3ca5cdf41a6d4))
- increase sleep duration for tag deletion - ([f777b95](https://github.com/liblaf/actions/commit/f777b953992d3901bb8711a03e543d3d27f312d7))
- replace \_wait_until_release with asyncio.sleep - ([11b0d1c](https://github.com/liblaf/actions/commit/11b0d1c9bab53f2eefc2b507e98def89aeff88e1))
- handle unset OWNER variable in secret-set.sh - ([b7061cf](https://github.com/liblaf/actions/commit/b7061cf1fba2c6d9a315d8565755082933bfcf38))
- correct syntax error in bash script - ([395b24e](https://github.com/liblaf/actions/commit/395b24e4b545b4e3df21c0ad03d29e4c6b4ed7cc))
- delete Git tag reference when removing a release - ([96f7646](https://github.com/liblaf/actions/commit/96f7646402cab42342bef77a8cd7226c82997921))
- correct configuration paths and update workflow scripts - ([b124907](https://github.com/liblaf/actions/commit/b124907402155384d1b88418222f421726637168))
- update changelog generation and release process - ([a75cf35](https://github.com/liblaf/actions/commit/a75cf359df25b51f94e50cb7b0f5651c43c2b331))
- simplify file path resolution logic - ([30b7f3a](https://github.com/liblaf/actions/commit/30b7f3a82f678b205ba5eb4852e3da2a72c4c62a))
- ensure consistent file hash output order - ([5b59473](https://github.com/liblaf/actions/commit/5b5947363ccdd3a534a956b0bd6e8367c3f5cf4b))
- improve regex pattern for template sync detection - ([3c23cd0](https://github.com/liblaf/actions/commit/3c23cd0f5a0f81a52b4a52ddfacb4e52a8efd22f))
- exclude specific commit messages from changelog - ([c9ff859](https://github.com/liblaf/actions/commit/c9ff8595f4c1e853d33cc763c3f43dccf7b9e041))
- correct hashsum and filename order in checksum output - ([d832045](https://github.com/liblaf/actions/commit/d8320452f8031460905578b214437bb5db0eb2c3))
- refactor GitHub release management to use githubkit - ([295f5b2](https://github.com/liblaf/actions/commit/295f5b248684155f73c80688e19e3c00d16d9786))
- correct async function calls to await release existence checks - ([1e7eb3c](https://github.com/liblaf/actions/commit/1e7eb3c8eaf7b5662f951d0c072ee8ffbad7b25b))
- handle download failures in remote hashsum retrieval - ([19497d7](https://github.com/liblaf/actions/commit/19497d7ced1bfa82ecd2e4d0c83ce4f9536bb7f4))
- enable colored output in release action - ([804cb18](https://github.com/liblaf/actions/commit/804cb18bbe3ec5702936115d91e4456784ed81c3))
- ensure release command is included in arguments - ([8317e30](https://github.com/liblaf/actions/commit/8317e30eeff25a1d9dff461de4fde2cfbcc5cec8))

### 📝 Documentation

- update date format in changelog template - ([0914906](https://github.com/liblaf/actions/commit/0914906a0b20304703f3396e2b291711a2b49772))
- reorganize and expand README content for clarity and usability - ([1056b8e](https://github.com/liblaf/actions/commit/1056b8ecc6bafac88b4d761cef1e23a3d03d7f49))
- create LICENSE - ([274dcc9](https://github.com/liblaf/actions/commit/274dcc9a3394c5b918dfb0571f349ab4f8bfb09a))
- enhance README with detailed GitHub Actions descriptions - ([53fa4ec](https://github.com/liblaf/actions/commit/53fa4ec98df11ba374038d97e21870cba1980574))

### ♻ Code Refactoring

- **changelog:** improve config handling in action.yaml - ([2aa8113](https://github.com/liblaf/actions/commit/2aa8113c3efe44a4f4d2e61bf7f7ab17362cdec2))
- **release:** simplify client initialization and error handling - ([2b8c0d7](https://github.com/liblaf/actions/commit/2b8c0d7dc6e8572698411d817a65b78a807cea1d))
- **release:** simplify changelog argument logic - ([fc4ad52](https://github.com/liblaf/actions/commit/fc4ad52c8feee4f659b1aecad9135fb4518b2304))
- reorganize configuration and linting files - ([42838bd](https://github.com/liblaf/actions/commit/42838bd5e07d2fb3ebdfffb5ef2dad36b3f93103))
- streamline MegaLinter configuration handling - ([9b67026](https://github.com/liblaf/actions/commit/9b67026d734213992d2d0a88cf93c1b204f9894e))
- rename and consolidate PR-related actions - ([0d176bc](https://github.com/liblaf/actions/commit/0d176bc70256cd10616bf4b40609702d5c6947ff))
- reorganize project structure and update dependencies - ([3130276](https://github.com/liblaf/actions/commit/3130276bb3b87c86c53510d03a54188f1bab3149))
- simplify author list retrieval in auto-review inputs - ([fcef102](https://github.com/liblaf/actions/commit/fcef10274736db233122fa4f87edb6e0a3070ccf))
- remove user-specific details from auto-review bot - ([b744ee1](https://github.com/liblaf/actions/commit/b744ee133f16a0beb07309fe28c2f446c08a5fc6))
- streamline changelog configuration and improve commit parsing - ([fbdbdc6](https://github.com/liblaf/actions/commit/fbdbdc6bb17479d4c887b535900d318833793975))

### ✅ Tests

- **app-list-repos:** enhance matrix configuration for dynamic repo inclusion - ([378c0d9](https://github.com/liblaf/actions/commit/378c0d9140e4cf1423a7faf80549ede678af6ac4))

### 👷 Build System

- **pip:** update dependency to include auth-app feature - ([de6f43b](https://github.com/liblaf/actions/commit/de6f43b124d8761750895acccb3da65b74fd6c4f))

### 🔧 Continuous Integration

- **mega-linter:** refactor configuration and improve script robustness - ([0567726](https://github.com/liblaf/actions/commit/0567726a3f0f5faed626c9a415c9795705b59a41))
- add liblaf-bot to default bot list in pr-review action - ([98b8314](https://github.com/liblaf/actions/commit/98b831487d4f58c2fa8c9b7bcd96612ad5b412a2))
- add release-please workflow and configuration - ([f1174db](https://github.com/liblaf/actions/commit/f1174db5028ff7b8d308e6ffe91a74eeb2d645fc))
- enhance Python setup action with package manager detection - ([11faa29](https://github.com/liblaf/actions/commit/11faa298310e7ed9a09396307a357af66b534a88))
- update mega-linter and add setup-python action - ([74831b7](https://github.com/liblaf/actions/commit/74831b743b6c935a96f6db9cce0f5b1ca8525a81))
- make GitHub status and SARIF reporters configurable - ([b055932](https://github.com/liblaf/actions/commit/b05593224e2d2ef4f0331096391dcf33704c44a6))
- ensure output file exists before formatting - ([9aae1b7](https://github.com/liblaf/actions/commit/9aae1b7e1068a23066dcd93a00007b29e45dfb72))
- update ruleset-import action to use correct spec - ([53414d8](https://github.com/liblaf/actions/commit/53414d8e89c6d585a83f87031b33193c02c19728))
- enhance file copying in prepare script - ([c6710ce](https://github.com/liblaf/actions/commit/c6710ce3067a8786321cd0d930261d11070d6ed4))
- remove unnecessary git fetch step in changelog action - ([1d254cb](https://github.com/liblaf/actions/commit/1d254cb98d7881af1e22465debe811f9b36198a7))
- fetch full git history before generating changelog - ([37f27c9](https://github.com/liblaf/actions/commit/37f27c9bdc2bd52f7e4a2a475d65bbfae6d73a0d))
- add workflow and script to set PAT secret in repositories - ([1d86d2e](https://github.com/liblaf/actions/commit/1d86d2e2f32db770431ec3e68963d4da5deff446))
- change default changelog output path to runner temp directory - ([716c529](https://github.com/liblaf/actions/commit/716c529150b3d7c6c2add21fafb5c551438b3dcf))
- add continue-on-error to SARIF upload and create review-pr action - ([9e8b8d4](https://github.com/liblaf/actions/commit/9e8b8d483fdc3dc3a725d37aa0e84cdff2583e83))
- streamline workflows and update linter configurations - ([ebc2688](https://github.com/liblaf/actions/commit/ebc268854eefc3948cea43d9bab5b0de7ad0f62f))
- switch from `copier update` to `copier recopy` for template updates - ([8c5912c](https://github.com/liblaf/actions/commit/8c5912c028896393ce7d5932ef6717058e83210f))
- enhance copier update script with color and grouping - ([d685282](https://github.com/liblaf/actions/commit/d685282ee0571b5b1b2ed4e4b6228b5c1956d1b9))
- prefix workflow names with "(Bot)" for clarity - ([269b61f](https://github.com/liblaf/actions/commit/269b61f921a95694b96fffbbf4eb35a0d8f93a9b))
- add workflow to sync repository settings - ([89583b8](https://github.com/liblaf/actions/commit/89583b8959a2768fe6b07ea54d81b23ab0a25def))
- customize run names for GitHub Actions workflows - ([b4944ef](https://github.com/liblaf/actions/commit/b4944ef08589f63cedc52786acebdd2ca92bb159))
- simplify path reference in CI workflow - ([5d49a77](https://github.com/liblaf/actions/commit/5d49a777aad1369b6bf4ab7ee66868f73fbaa376))
- add MegaLinter and JSCPD configurations for CI linting and duplication checks - ([050ceba](https://github.com/liblaf/actions/commit/050ceba27dcdc0ef4f2179aec30a5260b3dfc5af))

### ❤️ New Contributors

- @liblaf made their first contribution
- @liblaf-bot[bot] made their first contribution
