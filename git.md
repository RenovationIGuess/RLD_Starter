# Git workflows

## Git commit message conventions

The most popular git commit message convention is the Conventional Commits convention. This convention is used by many popular open source projects, including Angular, React, and Vue.js.

The Conventional Commits convention specifies the following format for commit messages:

```sh
<type>(<scope>): <subject>
[BREAKING CHANGE]
```

The <type> field specifies the type of change that the commit is making. The following types are supported:

- **feat**: A new feature has been added.
- **fix**: A bug has been fixed.
- **refactor**: The code has been refactored without changing any functionality.
- **docs**: The documentation has been updated.
- **test**: A new test has been added, or an existing test has been updated.
- **style**: Code style changes have been made.
- **perf**: The performance of the code has been improved.
- **chore**: Other changes have been made, such as updating dependencies or running scripts.

The <scope> field is optional, and it can be used to specify the area of the code that the commit is affecting. For example, if the commit is fixing a bug in the login page, the <scope> field could be login.

The <subject> field is a brief description of the change that the commit is making. The <subject> line should be concise and to the point, and it should start with a verb in the imperative mood.

The [BREAKING CHANGE] section is optional, and it should be used to describe any breaking changes that the commit is introducing.

Here are some examples of commit messages that follow the Conventional Commits convention:

```sh
feat(login): Add new feature to allow users to log in with social media accounts.
fix(api): Fix bug where the API was returning incorrect data.
refactor(database): Refactor database code to improve performance and readability.
docs(getting-started): Update getting started guide to reflect new changes.
test(unit): Add new unit tests for the new login feature.
style(components): Apply consistent code style to all components.
perf(api): Improve performance of API endpoint by caching results.
chore(deps): Update dependencies to latest versions.
```
