# Changelog

## [0.3.0](https://github.com/liblaf/actions/compare/v0.2.0...v0.3.0) (2025-11-02)


### ⚠ BREAKING CHANGES

* This commit removes all Python functionality and completely changes the project structure. Existing users must migrate to the new TypeScript-based actions.

### ✨ Features

* **auth:** add GitHub App authentication action ([1df313f](https://github.com/liblaf/actions/commit/1df313f0ef1bfbea444449383d9ca90c7c47814e))
* **release-please:** add GitHub Actions workflow for automated releases ([f7e8d52](https://github.com/liblaf/actions/commit/f7e8d526635af251f89035dc58c57796960dba64))
* **release-please:** configure release-please for automated releases ([5b1211a](https://github.com/liblaf/actions/commit/5b1211af1c346169dd2082196a4f6b691b943874))


### 🐛 Bug Fixes

* **build:** Downgrade bunup to 0.14.19 ([3f294a9](https://github.com/liblaf/actions/commit/3f294a9c8c2c4875a3e87b6de55e865d911786b3))
* **build:** pin bunup version to 0.14.19 ([f930764](https://github.com/liblaf/actions/commit/f93076403c9bba03b7d0f480a03b72b1bcfa4f5b))
* **delete-cancelled-runs:** handle 404 errors when deleting runs ([9b273c2](https://github.com/liblaf/actions/commit/9b273c2d21d4544ab282e2dd05ef5cc032a95a5b))
* **delete-cancelled-runs:** improve error handling for non-404 errors ([62a7bef](https://github.com/liblaf/actions/commit/62a7befd9325559e2bdd6a38039fdfca278f4ead))
* **deps:** update @octokit/openapi-types to ^26 ([4dccc8a](https://github.com/liblaf/actions/commit/4dccc8a41c1a5fc6fb675dcd85bcdc26d729f668))
* **octokit:** temporarily disable RequestError instance checks ([e0cd5f5](https://github.com/liblaf/actions/commit/e0cd5f518c9b907b62964dbec0dc6a225c046eb0))
* **release:** gracefully handle errors during release deletion ([2e2f534](https://github.com/liblaf/actions/commit/2e2f53430146020c432b44dc659766a459cc767a))
* **setup-pages:** use Octokit constructor directly ([fe19027](https://github.com/liblaf/actions/commit/fe19027510a9fd9ede01fb36b3a0757ed793cbf5))
* **skip-duplicate:** Make skip-duplicate and delete-cancelled-runs steps non-blocking ([996912f](https://github.com/liblaf/actions/commit/996912fb578e6faaa0d7d6c8868af997eca13f9b))
* update repository references from actions-ts to actions ([1468568](https://github.com/liblaf/actions/commit/1468568b50812f50eb583c5f33c6dcfaf4a454bb))


### 📝 Documentation

* add deprecation warning to README ([73bdd58](https://github.com/liblaf/actions/commit/73bdd58ac025fa0a3d04c89d1580c460e2d0b06b))
* Add README with project title ([08d35ec](https://github.com/liblaf/actions/commit/08d35ecc0f242210abe048974ac681bcb0c518f8))


### ♻️ Code Refactoring

* **actions:** Wrap action entrypoints with error handling ([77a969a](https://github.com/liblaf/actions/commit/77a969abb462f5e76cfb2f873eada64b6b9f8850))
* **build:** use fluent API for copy plugin in bunup config ([47f28bc](https://github.com/liblaf/actions/commit/47f28bcf82e34f95068afc17c5f4a46371a8b991))
* **octokit:** standardize on octokit package and remove build step ([c03644b](https://github.com/liblaf/actions/commit/c03644b1f2b79f7d06f1b1cf5e26accd54b70df5))


### 🛠 Builds

* convert project to TypeScript GitHub Actions ([ef94fc8](https://github.com/liblaf/actions/commit/ef94fc8c90fcd8620579eb3a5e5bda006be4dcf5))
* **deps:** update @octokit/openapi-types and bunup dependencies ([0190df1](https://github.com/liblaf/actions/commit/0190df16f62b7b78a92fd8d70600a695966c9528))


### ⚙️ Continuous Integration

* **deploy:** remove concurrency group and rename skip job ([c9b3bb2](https://github.com/liblaf/actions/commit/c9b3bb26cd8fe46dd3f045b3942247578f0ce6f4))
* **deploy:** remove skip-duplicate job and condition from build job ([38efaad](https://github.com/liblaf/actions/commit/38efaadc0dfd992247297a41c9d1d797d2ec9f37))
* **deploy:** Trigger deployment on published releases ([212e095](https://github.com/liblaf/actions/commit/212e09530da5856beda254f6082c39f21bda4cb6))
* **tsc:** Add TypeScript check workflow ([7649850](https://github.com/liblaf/actions/commit/76498508fb24437b3212ab434e7353639aa76fc7))
* **tsc:** enable pretty output for TypeScript check ([4b70d53](https://github.com/liblaf/actions/commit/4b70d5303b2602acb50679c28b13a7df0adbede7))
