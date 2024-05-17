<div style="margin-top: 30px">
<h1 align="center">

![](/src/swiftie-commit.jpeg)

Swift Commits

[![swift commits is enabled](https://img.shields.io/badge/swift--commits-enabled?style=for-the-badge&logo=git&color=a6e3a1&logoColor=D9E0EE&labelColor=302D41)](https://github.com/christina-de-martinez/swift-commits)
[![downloads](https://img.shields.io/npm/dt/swift-commits.svg?style=for-the-badge&logo=npm&color=74c7ec&logoColor=D9E0EE&labelColor=302D41)](https://www.npmjs.com/package/swift-commits)

</h1>
</div>

<p align="center">
A CLI for writing even better commits, with a Swiftie twist.
</p>

## ✨ Features

- Choose between [quill, fountain pen, or glitter gel pen](https://youtu.be/xMy8ZGlKf1U?si=kFeh3DoaALLQu3DN&t=276) commit scopes
- Select how you feel about your code and get an assigned lyric as the commit message
- Only for true Swifties

## 📦 Installation

```sh
npm install -g swift-commits
```

## 🚀 Usage

When you're ready to commit. To run the CLI in your terminal:

```sh
swift-commits
# or
npx swift-commits
```

It will prompt a series of questions. These prompts will build a commit message, which you can preview, before confirming the commit.
Some of the values in these prompts will be infered by your branch name and auto populated. You can adjust this in your `.better-commits.json` configuration file.

To better understand these prompts and their intention, read [Conventional Commits Summary](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary)

## ⚙️ Configuration

### Global

Your first time running `swift-commits`, a default config will be generated in your `$HOME` directory, named `.better-commits.json`

- This config will be used if a repository-specific config cannot be found.

### Repository

To create a **repository-specific config**, navigate to the root of your project.

- Run `better-commits-init`
- This will create a default config named `.better-commits.json`
- Properties such as `confirm_with_editor` and `overrides` will prefer the global config

### Options

Better-commits (& better-branch) are highly flexible with sane defaults. These options allow you specify whats best for your workflow.

> [!NOTE]<br>
> All properties are optional and can be removed from the config. It will be replaced by the default at run-time.
>
> - See `.better-commits.json` in this repository as an example

### 💫 Default JSON Config

<details open>
<summary>Expand / Collapse</summary>

```json
{
  "check_status": true,
  "commit_type": {
    "enable": true,
    "initial_value": "feat",
    "infer_type_from_branch": true,
    "append_emoji_to_label": false,
    "append_emoji_to_commit": false,
    "options": [
      {
        "value": "quill",
        "label": "quill",
        "hint": "Makes you feel 'all old fashioned, like you’re a 19th century poet crafting your next sonnet by candlelight'",
        "emoji": "🪶",
        "trailer": "Changelog: quill pen"
      },
      {
        "value": "fountain",
        "label": "fountain",
        "hint": "'Modern, personal stories written like poetry'",
        "emoji": "🖋️",
        "trailer": "Changelog: fountain pen"
      },
      {
        "value": "glitter-gel",
        "label": "glitter-gel",
        "hint": "Makes you 'want to dance, sing, and toss glitter around the room'",
        "emoji": "✨",
        "trailer": "Changelog: glitter gel pen"
      },
      {
        "value": "",
        "label": "none"
      }
    ]
  },
  "commit_scope": {
    "enable": true,
    "custom_scope": false,
    "initial_value": "app",
    "options": [
      {
        "value": "app",
        "label": "app"
      },
      {
        "value": "shared",
        "label": "shared"
      },
      {
        "value": "server",
        "label": "server"
      },
      {
        "value": "tools",
        "label": "tools"
      },
      {
        "value": "",
        "label": "none"
      }
    ]
  },
  "check_ticket": {
    "infer_ticket": true,
    "confirm_ticket": true,
    "add_to_title": true,
    "append_hashtag": false,
    "prepend_hashtag": "Never",
    "surround": "",
    "title_position": "start"
  },
  "commit_title": {
    "max_size": 70
  },
  "commit_body": {
    "enable": true,
    "required": false
  },
  "commit_footer": {
    "enable": true,
    "initial_value": [],
    "options": ["closes", "trailer", "breaking-change", "deprecated", "custom"]
  },
  "breaking_change": {
    "add_exclamation_to_title": true
  },
  "confirm_commit": true,
  "confirm_with_editor": false,
  "print_commit_output": true,
  "branch_pre_commands": [],
  "branch_post_commands": [],
  "worktree_pre_commands": [],
  "worktree_post_commands": [],
  "branch_user": {
    "enable": true,
    "required": false,
    "separator": "/"
  },
  "branch_type": {
    "enable": true,
    "separator": "/"
  },
  "branch_version": {
    "enable": false,
    "required": false,
    "separator": "/"
  },
  "branch_ticket": {
    "enable": true,
    "required": false,
    "separator": "-"
  },
  "branch_description": {
    "max_length": 70,
    "separator": ""
  },
  "branch_action_default": "branch",
  "branch_order": ["user", "version", "type", "ticket", "description"],
  "enable_worktrees": true,
  "overrides": {
    "shell": "/bin/sh"
  }
}
```

</details>

> [!NOTE]<br>
> Some properties allow a set of specifc string values
>
> - See _config file explanations_ for possible values

### 🔭 Config File Explanations

Expand to see explanations and possible values

<details>
<summary>Expand / Collapse</summary>

`.` refers to nesting. i.e. if a property is `commit_type.enable` then expect in the config for it to be:

```json
"commit_type": {
  "enable": true
}
```

| Property                                   | Description                                                                                         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `check_status`                             | If true run interactive `git status`                                                                |
| `commit_type.enable`                       | If true include commit type                                                                         |
| `commit_type.initial_value`                | Initial selection of commit type                                                                    |
| `commit_type.infer_type_from_branch`       | If true infer type from branch name                                                                 |
| `commit_type.append_emoji_to_label`        | If true append emoji to prompt                                                                      |
| `commit_type.append_emoji_to_commit`       | If true append emoji to commit                                                                      |
| `commit_type.options.value`                | Commit type prompt value                                                                            |
| `commit_type.options.label`                | Commit type prompt label                                                                            |
| `commit_type.options.hint`                 | Commit type inline hint (like this)                                                                 |
| `commit_type.options.emoji`                | Commit type emoji                                                                                   |
| `commit_type.options.trailer`              | Commit type trailer                                                                                 |
| `commit_scope.enable`                      | If true include commit scope                                                                        |
| `commit_scope.custom_scope`                | If true allow custom scope at run-time                                                              |
| `commit_scope.initial_value`               | Default commit scope selected                                                                       |
| `commit_scope.options.value`               | Commit scope value                                                                                  |
| `commit_scope.options.label`               | Commit scope label                                                                                  |
| `check_ticket.infer_ticket`                | If true infer ticket from branch name                                                               |
| `check_ticket.confirm_ticket`              | If true manually confirm inference                                                                  |
| `check_ticket.add_to_title`                | If true add ticket to title                                                                         |
| `check_ticket.append_hashtag`              | **Deprecated**: see prepend_hashtag                                                                 |
| `check_ticket.prepend_hashtag`             | "Never" (default), "Prompt", or "Always"                                                            |
| `check_ticket.title_position`              | "start" (of description) (default), "end", "before-colon", "beginning" (of the entire commit title) |
| `check_ticket.surround`                    | "" (default), "[]", "()", "{}" - Wraps ticket in title                                              |
| `commit_title.max_size`                    | Max size of title including scope, type, etc...                                                     |
| `commit_body.enable`                       | If true include body                                                                                |
| `commit_body.required`                     | If true body is required                                                                            |
| `commit_footer.enable`                     | If true include footer                                                                              |
| `commit_footer.initial_value`              | Initial values selected in footer                                                                   |
| `commit_footer.options`                    | Footer options                                                                                      |
| `breaking_change.add_exclamation_to_title` | If true adds exclamation mark to title for breaking changes                                         |
| `confirm_commit`                           | If true manually confirm commit at end                                                              |
| `confirm_with_editor`                      | Confirm / Edit commit with $GIT_EDITOR / $EDITOR                                                    |
| `print_commit_output`                      | If true pretty print commit preview                                                                 |
| `overrides.shell`                          | Override default shell, useful for windows users                                                    |

Branch configuration (same config file, split for readability)

| Property                        | Description                                               |
| ------------------------------- | --------------------------------------------------------- |
| `branch_pre_commands`           | Array of shell commands to run before branching           |
| `branch_post_commands`          | Array of shell commands to run after branching            |
| `worktree_pre_commands`         | Array of shell commands to run before creating worktree   |
| `worktree_post_commands`        | Array of shell commands to run after creating worktree    |
| `branch_user.enable`            | If enabled include user name                              |
| `branch_user.required`          | If enabled require user name                              |
| `branch_user.separator`         | Branch delimeter - "/" (default), "-", "\_"               |
| `branch_type.enable`            | If enabled include type                                   |
| `branch_type.separator`         | Branch delimeter - "/" (default), "-", "\_"               |
| `branch_ticket.enable`          | If enabled include ticket                                 |
| `branch_ticket.required`        | If enabled require ticket                                 |
| `branch_ticket.separator`       | Branch delimeter - "/", "-" (default), "\_"               |
| `branch_description.max_length` | Max length branch name                                    |
| `branch_description.separator`  | Branch delimeter - "" (default), "/", "-", "\_"           |
| `branch_version.enable`         | If enabled include version                                |
| `branch_version.required`       | If enabled require version                                |
| `branch_version.separator`      | Branch delimeter - "", "/" (default), "-", "\_"           |
| `branch_order`                  | Order of branch name values (doesn't effect prompt order) |
| `branch_action_default`         | "branch" or "worktree"                                    |
| `enable_worktrees`              | If false, always default to branch action                 |

</details>

### 🔎 Inference

`better-commits` will attempt to infer the ticket/issue and the commit-type from your branch name. It will auto populate the corresponding field if found.

**Ticket / Issue-Number**

- If a `STRING-NUMBER` or `NUMBER` are at the start of the branch name or after a `/`

**Commit Type**

- If a type is at the start of the branch or is followed by a `/`

## 🌳 Better Branch

> [!NOTE]<br>
> Using `better-branch` with `better-commits` can supercharge your git workflow.
> Make sure to try it out!

Better branch is a secondary feature that works with better commits

- Supports consistent branch naming conventions
- Uses same type-list/prompt from your config
- Enables better-commits to infer type & ticket
- Caches your username for speedy branching

To run the CLI in your terminal:

```sh
better-branch
```

### Worktree Support

`better-branch` will prompt for **Branch** or **Worktree**. Creating a **Worktree** with `better-branch` is a great way to create worktrees while maintaining consistent branch naming conventions.

The worktree flow creates a folder/worktree with your **branch description** and a git branch inside with your **full branch name**.

> [!NOTE]<br>
> Creating a worktree named `everduin94/feat/TAC-123-add-worktrees` with the native git command would create a nested folder for each `/`. `better-branch` removes the hassle by creating 1 folder while still using the full name for the branch.

### Pre/Post Branch Checkout Hooks

Optionally configure pre and post checkout commands, for example:

- checkout and rebase main before branching
- run `npm install` before branching
- run `npm run dev` after branching

See _branch_pre_commands_ and _branch_post_commands_ in default config. (or _worktree_pre_commands_ and _worktree_post_commands_ for creating worktrees)

## 🌌 Mildly Interesting

### Building / Versioning

`better-commits` works with [Semantic Release](https://github.com/semantic-release/semantic-release)

- See _package.json_ and _.github/workflows/publish.yml_ for example

### Github

If you use `better-commits` to create your _first_ commit on a new branch

- When you open a PR for that branch, it will properly **auto-populate the title and body**.
- When you squash/merge, all later commits like "addressing comments" or "fixing mistake". Will be prefixed with an asterisk for easy deletion. This way, you **maintain your pretty commit even when squashing**.

If you're using Github issues to track your work, and select the `closes` footer option when writing your commit. Github will **automatically link and close** that issue when your **pr is merged**

### Changelogs

`better-commits` can append a commit trailer per commit type. This allows you to [automate change logs](https://docs.gitlab.com/ee/user/project/changelogs.html) with tools like Gitlab.

### Fun Facts

`better-commits` uses native `git` commands under the hood. So any hooks, tools, or staging should work as if it was a normal commit.

Setting `confirm_with_editor=true` will allow you to edit/confirm a commit with your editor.

- For example, to edit with Neovim: `git config --global core.editor "nvim"`
- For VS Code, `git config --global core.editor "code -n --wait"`

> [!NOTE]<br>
> Enjoy learning, open source technology, and note-taking? [Join our Discord!](https://discord.gg/grHVnZwYup)

You can add this badge to your repository to display that you're using a better-commits repository config

| Markdown                                                                                                                                                                                                                  | Result                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[![swift commits is enabled](https://img.shields.io/badge/swift--commits-enabled?style=for-the-badge&logo=git&color=a6e3a1&logoColor=D9E0EE&labelColor=302D41)](https://github.com/christina-de-martinez/swift-commits)` | [![swift commits is enabled](https://img.shields.io/badge/swift--commits-enabled?style=for-the-badge&logo=git&color=a6e3a1&logoColor=D9E0EE&labelColor=302D41)](https://github.com/christina-de-martinez/swift-commits) |

---

### 🪟 Troubleshooting Windows

#### Git Bash

`TTY initialization failed: uv_tty_init returned EBADF (bad file descriptor)`. This may happen because you're running something like git-bash on Windows. Try another terminal/command-prompt or `winpty` to see if its still an issue.

#### Multi-line

If your are having issues with multilines for commits on windows, you can override the shell via your `.better-commits.json` config.

Example

```json
"overrides": {
   "shell": "c:\\Program Files\\Git\\bin\\bash.exe"
}
```
