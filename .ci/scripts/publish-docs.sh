#!/bin/bash
set -euo pipefail

# -------- CONFIG --------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="gh-pages"
DOCS_BUILD="${SCRIPT_DIR}/../../docs/.vitepress/dist"
VERSION="${1:-latest}"

# -------- CHECK ENV --------
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "GITHUB_TOKEN not set"; exit 1
fi

# -------- BUILD DOCS (if needed) --------
if [[ ! -d "$DOCS_BUILD" ]]; then
  echo "Docs build not found, building..."
  (cd "${SCRIPT_DIR}/../.." && npm run docs:build)
fi

# -------- CLONE BRANCH --------
TEMP_DIR=$(mktemp -d)
git clone --branch "$BRANCH" --depth 1 "https://${GITHUB_TOKEN}@${REPO}" "$TEMP_DIR"
cd "$TEMP_DIR"

# -------- COPY DOCS --------
rm -rf "$VERSION"
cp -r "$DOCS_BUILD" "$VERSION"

rm -rf latest
cp -r "$DOCS_BUILD" latest

# -------- UPDATE VERSIONS.JSON --------
versions=()
for d in v*/; do
  v="${d%/}"
  versions+=("\"$v\"")
done
# Always put "latest" first
echo "[\"latest\",${versions[*]}]" | sed 's/,]/]/' > versions.json

# -------- COMMIT & PUSH --------
git add "$VERSION" latest versions.json
git config user.name "ci-bot"
git config user.email "ci-bot@example.com"
git commit -m "docs: update $VERSION ($(date +%Y-%m-%d))" || echo "Nothing to commit"
git push

# -------- CLEANUP --------
cd -
rm -rf "$TEMP_DIR"
