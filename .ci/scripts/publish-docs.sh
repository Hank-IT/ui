#!/bin/bash
set -euo pipefail

# -------- CONFIG --------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="gh-pages"
VERSION="${1:-latest}"
DOCS_BUILD="${SCRIPT_DIR}/../../docs/.vitepress/dist"

# -------- CHECK ENV --------
if [[ -z "${GITHUB_ACCESS_TOKEN:-}" ]]; then
  echo "GITHUB_ACCESS_TOKEN not set"; exit 1
fi

# -------- BUILD DOCS --------
(cd "${SCRIPT_DIR}/../.." && npm run docs:build)

# -------- CLONE BRANCH --------
TEMP_DIR=$(mktemp -d)
git clone --branch "$BRANCH" --depth 1 "https://${GITHUB_ACCESS_TOKEN}@${REPO}" "$TEMP_DIR"
cd "$TEMP_DIR"

# -------- COPY DOCS --------
rm -rf "$VERSION"
cp -r "$DOCS_BUILD" "$VERSION"

rm -rf latest
cp -r "$DOCS_BUILD" latest

# -------- UPDATE VERSIONS.JSON --------
versions=()
shopt -s nullglob
for d in [0-9]*/; do
  v="${d%/}"
  versions+=("\"$v\"")
done
shopt -u nullglob
# Always put "latest" first
echo "[\"latest\",${versions[*]}]" | sed 's/,]/]/' > versions.json

# Copy versions.json into each versioned folder and latest
cp versions.json "$VERSION/versions.json"
cp versions.json latest/versions.json

# -------- COMMIT & PUSH --------
git add "$VERSION" latest versions.json "$VERSION/versions.json" latest/versions.json
git config user.name "ci-bot"
git config user.email "ci-bot@example.com"
git commit -m "docs: update $VERSION ($(date +%Y-%m-%d))" || echo "Nothing to commit"
git push


# -------- CLEANUP --------
cd -
rm -rf "$TEMP_DIR"
