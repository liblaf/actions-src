#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
brew update
brew install "$@"

for pkg in "$@"; do
  case "$pkg" in
    coreutils | make | gnu-*)
      PATH="$(brew --prefix)/opt/$pkg/libexec/gnubin:$PATH"
      echo "$(brew --prefix)/opt/$pkg/libexec/gnubin" >> "$GITHUB_PATH"
      ;;
  esac
done
