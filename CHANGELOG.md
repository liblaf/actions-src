# Changelog

## [0.3.1](https://github.com/liblaf/actions/compare/v0.3.0..v0.3.1) - 2025-11-02

### 🐛 Bug Fixes

- trigger release - ([1b3bbdb](https://github.com/liblaf/actions/commit/1b3bbdbace43ad6f35facc230e8e9cf6091139c4))

### 🔧 Continuous Integration

- enable manual trigger for deploy workflow - ([95ae943](https://github.com/liblaf/actions/commit/95ae94379e9dbada2f6a4a51d52199191bd3ca8e))

### ❤️ New Contributors

- [@liblaf](https://github.com/liblaf) made their first contribution

## [0.3.0](https://github.com/liblaf/actions/compare/v0.2.0..v0.3.0) - 2025-11-02

### 💥 BREAKING CHANGES

- convert project to TypeScript GitHub Actions - ([ef94fc8](https://github.com/liblaf/actions/commit/ef94fc8c90fcd8620579eb3a5e5bda006be4dcf5))

### ✨ Features

- **auth:** add GitHub App authentication action - ([1df313f](https://github.com/liblaf/actions/commit/1df313f0ef1bfbea444449383d9ca90c7c47814e))
- **release-please:** add GitHub Actions workflow for automated releases - ([f7e8d52](https://github.com/liblaf/actions/commit/f7e8d526635af251f89035dc58c57796960dba64))
- **release-please:** configure release-please for automated releases - ([5b1211a](https://github.com/liblaf/actions/commit/5b1211af1c346169dd2082196a4f6b691b943874))

### 🐛 Bug Fixes

- **build:** Downgrade bunup to 0.14.19 - ([3f294a9](https://github.com/liblaf/actions/commit/3f294a9c8c2c4875a3e87b6de55e865d911786b3))
- **build:** pin bunup version to 0.14.19 - ([f930764](https://github.com/liblaf/actions/commit/f93076403c9bba03b7d0f480a03b72b1bcfa4f5b))
- **delete-cancelled-runs:** improve error handling for non-404 errors - ([62a7bef](https://github.com/liblaf/actions/commit/62a7befd9325559e2bdd6a38039fdfca278f4ead))
- **delete-cancelled-runs:** handle 404 errors when deleting runs - ([9b273c2](https://github.com/liblaf/actions/commit/9b273c2d21d4544ab282e2dd05ef5cc032a95a5b))
- **octokit:** temporarily disable RequestError instance checks - ([e0cd5f5](https://github.com/liblaf/actions/commit/e0cd5f518c9b907b62964dbec0dc6a225c046eb0))
- **release:** gracefully handle errors during release deletion - ([2e2f534](https://github.com/liblaf/actions/commit/2e2f53430146020c432b44dc659766a459cc767a))
- **setup-pages:** use Octokit constructor directly - ([fe19027](https://github.com/liblaf/actions/commit/fe19027510a9fd9ede01fb36b3a0757ed793cbf5))
- **skip-duplicate:** Make skip-duplicate and delete-cancelled-runs steps non-blocking - ([996912f](https://github.com/liblaf/actions/commit/996912fb578e6faaa0d7d6c8868af997eca13f9b))
- update repository references from actions-ts to actions - ([1468568](https://github.com/liblaf/actions/commit/1468568b50812f50eb583c5f33c6dcfaf4a454bb))

### ⬆️ Dependencies

- **deps:** update @octokit/openapi-types to ^26 - ([4dccc8a](https://github.com/liblaf/actions/commit/4dccc8a41c1a5fc6fb675dcd85bcdc26d729f668))

### 📝 Documentation

- Add README with project title - ([08d35ec](https://github.com/liblaf/actions/commit/08d35ecc0f242210abe048974ac681bcb0c518f8))
- add deprecation warning to README - ([73bdd58](https://github.com/liblaf/actions/commit/73bdd58ac025fa0a3d04c89d1580c460e2d0b06b))

### ♻ Code Refactoring

- **actions:** Wrap action entrypoints with error handling - ([77a969a](https://github.com/liblaf/actions/commit/77a969abb462f5e76cfb2f873eada64b6b9f8850))
- **build:** use fluent API for copy plugin in bunup config - ([47f28bc](https://github.com/liblaf/actions/commit/47f28bcf82e34f95068afc17c5f4a46371a8b991))
- **octokit:** standardize on octokit package and remove build step - ([c03644b](https://github.com/liblaf/actions/commit/c03644b1f2b79f7d06f1b1cf5e26accd54b70df5))

### 👷 Build System

- **deps:** update @octokit/openapi-types and bunup dependencies - ([0190df1](https://github.com/liblaf/actions/commit/0190df16f62b7b78a92fd8d70600a695966c9528))

### 🔧 Continuous Integration

- **deploy:** Trigger deployment on published releases - ([212e095](https://github.com/liblaf/actions/commit/212e09530da5856beda254f6082c39f21bda4cb6))
- **deploy:** remove skip-duplicate job and condition from build job - ([38efaad](https://github.com/liblaf/actions/commit/38efaadc0dfd992247297a41c9d1d797d2ec9f37))
- **deploy:** remove concurrency group and rename skip job - ([c9b3bb2](https://github.com/liblaf/actions/commit/c9b3bb26cd8fe46dd3f045b3942247578f0ce6f4))
- **tsc:** enable pretty output for TypeScript check - ([4b70d53](https://github.com/liblaf/actions/commit/4b70d5303b2602acb50679c28b13a7df0adbede7))
- **tsc:** Add TypeScript check workflow - ([7649850](https://github.com/liblaf/actions/commit/76498508fb24437b3212ab434e7353639aa76fc7))

### ❤️ New Contributors

- [@copier-update[bot]](https://github.com/apps/copier-update) made their first contribution in [#53](https://github.com/liblaf/actions/pull/53)

## [0.2.0](https://github.com/liblaf/actions/compare/v0.1.8..v0.2.0) - 2025-08-04

### 💥 BREAKING CHANGES

- **approve:** rename from pr-review and improve functionality - ([87105ee](https://github.com/liblaf/actions/commit/87105eefc13f43b8cd7d83341733982305e3a097))

### ✨ Features

- **actions:** add delete-cancelled-runs action - ([9f1f1c2](https://github.com/liblaf/actions/commit/9f1f1c28ebd2692ea20b405366b67dab37fedcd4))

### 🐛 Bug Fixes

- **ruleset-import:** remove explicit Python version from pipx command - ([4b963cf](https://github.com/liblaf/actions/commit/4b963cfc3c662e7fd82a785b399ba578913bc389))

### ♻ Code Refactoring

- **pr-review:** migrate to shell script implementation - ([99cb933](https://github.com/liblaf/actions/commit/99cb9331aca97776d8f325012974fa053d46e769))

## [0.1.8](https://github.com/liblaf/actions/compare/v0.1.7..v0.1.8) - 2025-06-09

### 🐛 Bug Fixes

- **commit:** properly handle branch ref format - ([8f26d0c](https://github.com/liblaf/actions/commit/8f26d0c0b70e26d59043150aebb3ffc740fb64eb))
- **commit:** correct conditional expression syntax - ([2b394af](https://github.com/liblaf/actions/commit/2b394af580b48145675b72534881b97392a57bd7))
- **commit:** improve branch reference handling - ([1026cca](https://github.com/liblaf/actions/commit/1026cca96cfc055956c16faf1197eb3722bc68f0))

### ♻ Code Refactoring

- **commit:** simplify branch handling logic - ([26f76e1](https://github.com/liblaf/actions/commit/26f76e15b202f646c0f2feb87c0a3336c9639975))

## [0.1.7](https://github.com/liblaf/actions/compare/v0.1.6..v0.1.7) - 2025-06-07

### ⬆️ Dependencies

- **deps:** update dependency liblaf-grapes to >=0.2,<0.3 (#19) - ([79a6f87](https://github.com/liblaf/actions/commit/79a6f878fd12bc43e27b743bf4fb0e926f4a2326))

## [0.1.6](https://github.com/liblaf/actions/compare/v0.1.5..v0.1.6) - 2025-06-01

### ✨ Features

- add composite GitHub action for git commits - ([a444236](https://github.com/liblaf/actions/commit/a4442368ce40f7f3660cfffeb6751d1e8b41c257))

### 🐛 Bug Fixes

- **commit:** ensure force input is properly evaluated as boolean - ([1c8bb5f](https://github.com/liblaf/actions/commit/1c8bb5f88706e198eec05fea936f49b939d8a21d))
- **commit:** change default fail-on-no-changes to false - ([bb87604](https://github.com/liblaf/actions/commit/bb87604037f384c0314e69503f27b78ca6deb017))
- rename mise config file from 99-custom.toml to config.dev.toml - ([b2b6443](https://github.com/liblaf/actions/commit/b2b64432058f2c23dccc7a415ec006dbb9e39931))
- migrate from mike to mkdocs gh-deploy - ([05b5b80](https://github.com/liblaf/actions/commit/05b5b80268bffe3f477ce50889fb4edee92f2546))

## [0.1.5](https://github.com/liblaf/actions/compare/v0.1.4..v0.1.5) - 2025-05-23

### ✨ Features

- **auth-app:** add new input options and improve git config - ([980bf8c](https://github.com/liblaf/actions/commit/980bf8ca4a45e563c8cec8474332d50de2b0520c))
- **setup-python:** activate virtual environment when using uv - ([8054e02](https://github.com/liblaf/actions/commit/8054e021fb0c17f1ea3441f54d85dc495a849f15))

### 📝 Documentation

- enhance changelog contributor mentions with GitHub links - ([bb0da78](https://github.com/liblaf/actions/commit/bb0da789ed882ddc83b77cf492475cb62cc5f0e9))

### 👷 Build System

- migrate from Just to Mise for task management - ([cf53d38](https://github.com/liblaf/actions/commit/cf53d38bf304506f24b2df3fe2f2343b27653e4e))

### 🔧 Continuous Integration

- specify bash shell for mkdir command in test workflow - ([ec469cb](https://github.com/liblaf/actions/commit/ec469cbf8aee2f0212a93aa3cdd31bfdd2acf6e3))
- add mkdir version check in test workflow - ([008c344](https://github.com/liblaf/actions/commit/008c344fc64059ecbac3ed9751473fe0376e2934))

## [0.1.4](https://github.com/liblaf/actions/compare/v0.1.3..v0.1.4) - 2025-04-21

### ⬆️ Dependencies

- **deps:** update dependency rich to v14 (#13) - ([0baa503](https://github.com/liblaf/actions/commit/0baa503acd4b79af35b8defa03e17f5ee41e48a7))

### ❤️ New Contributors

- [@renovate[bot]](https://github.com/apps/renovate) made their first contribution in [#13](https://github.com/liblaf/actions/pull/13)

## [0.1.3](https://github.com/liblaf/actions/compare/v0.1.2..v0.1.3) - 2025-03-30

### ✨ Features

- **setup-python:** deprecate python-version input in favor of pyproject.toml - ([d6c60f3](https://github.com/liblaf/actions/commit/d6c60f31bedef4b2c8f362854dbf307eec098cf0))

### 🐛 Bug Fixes

- **semver-parse:** strip 'v' prefix from version string - ([27eacdb](https://github.com/liblaf/actions/commit/27eacdb02cc0e1e7048ae205d48237936a001918))
- **setup-pages:** correctly parse repository owner and name - ([1860a58](https://github.com/liblaf/actions/commit/1860a582f255cfa3125cf801672a2b5f85254766))
- **setup-python:** ensure correct Python version is passed to uv - ([c942476](https://github.com/liblaf/actions/commit/c942476c75c228a047cdddbb23c5a6ec87b62695))
- correct linter config paths and step conditions - ([c00fca9](https://github.com/liblaf/actions/commit/c00fca91da11865a9e9752a7f5753bb5e1e9365e))
- standardize FORCE_COLOR environment variable format - ([c15d23e](https://github.com/liblaf/actions/commit/c15d23e0916a70eb5a420ba110d127040131a1f1))

### 📝 Documentation

- add mike as a dependency for documentation - ([9966636](https://github.com/liblaf/actions/commit/9966636a9a1017b82e803e0923857821ea15bcd8))

### 👷 Build System

- update project configuration and structure - ([54caf55](https://github.com/liblaf/actions/commit/54caf55a214638d9548b1de3c76fa25bcdafcb74))

### 🔧 Continuous Integration

- remove deprecated secret-set workflow - ([c2fad1d](https://github.com/liblaf/actions/commit/c2fad1db93d4fe409a21a129d7183f16d9227073))
- update GitHub Pages token configuration in docs workflows - ([cc0495f](https://github.com/liblaf/actions/commit/cc0495fa2fa7d44f24c796b94d3cb7db42858911))
- restructure documentation workflows and integrate mike - ([93da719](https://github.com/liblaf/actions/commit/93da719bdb3bd51aabe6499d8e3a5f4cba16ea48))

## [0.1.2](https://github.com/liblaf/actions/compare/v0.1.1..v0.1.2) - 2025-03-23

### ✨ Features

- **setup-pages:** add GitHub token input to action - ([37bf1f7](https://github.com/liblaf/actions/commit/37bf1f7600b4db1314097917bd2242a2b84727e0))
- add SemVer parse and GitHub Pages setup actions - ([01a6e39](https://github.com/liblaf/actions/commit/01a6e391b4586c1dd2852f1197c88019573a3072))

### ♻ Code Refactoring

- replace toolkit.github with github module in actions - ([c81d559](https://github.com/liblaf/actions/commit/c81d559fae1201ad1a28af37d6e6cfeca041b7ef))

## [0.1.1](https://github.com/liblaf/actions/compare/v0.1.0..v0.1.1) - 2025-03-23

### 🐛 Bug Fixes

- **release:** re-enable checksum calculation for assets - ([4b3ca45](https://github.com/liblaf/actions/commit/4b3ca458244739ab8e98a09e37660f92721960fb))

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

- [@liblaf[bot]](https://github.com/apps/liblaf) made their first contribution in [#9](https://github.com/liblaf/actions/pull/9)
- [@liblaf](https://github.com/liblaf) made their first contribution
