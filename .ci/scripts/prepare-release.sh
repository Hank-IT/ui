#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_FILE="${SCRIPT_DIR}/../../package.json"
CHANGELOG_FILE="${SCRIPT_DIR}/../../CHANGELOG.md"
BRANCH_PREFIX="release"
BUMP_TYPE="${1:-patch}"

# Step 1: Bump version using jq
VERSION=$("$SCRIPT_DIR/parse-version.sh")
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"
case "$BUMP_TYPE" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "Invalid bump type"; exit 1 ;;
esac
NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
jq --arg v "$NEW_VERSION" '.version = $v' "$PACKAGE_FILE" > "${PACKAGE_FILE}.tmp" && mv "${PACKAGE_FILE}.tmp" "$PACKAGE_FILE"

# Step 2: Generate changelog
npx conventional-changelog -p angular -r 1 > "$SCRIPT_DIR/CHANGELOG.part.md"
echo -e "## v$NEW_VERSION - $(date +%Y-%m-%d)\n" | cat - "$SCRIPT_DIR/CHANGELOG.part.md" > "$SCRIPT_DIR/CHANGELOG.final.md"
if [[ -f "$CHANGELOG_FILE" ]]; then
  cat "$SCRIPT_DIR/CHANGELOG.final.md" "$CHANGELOG_FILE" > "${CHANGELOG_FILE}.new"
  mv "${CHANGELOG_FILE}.new" "$CHANGELOG_FILE"
else
  mv "$SCRIPT_DIR/CHANGELOG.final.md" "$CHANGELOG_FILE"
fi
rm -f "$SCRIPT_DIR"/CHANGELOG.*

# Step 3: Commit, tag, and push
git checkout -b "$BRANCH_PREFIX/v$NEW_VERSION"
git add "$PACKAGE_FILE" "$CHANGELOG_FILE"
git commit -m "chore: release v$NEW_VERSION"
git tag "v$NEW_VERSION"
git push origin "v$NEW_VERSION"
git push origin "$BRANCH_PREFIX/v$NEW_VERSION"

# Step 4: Create PR to develop
gh pr create \
  --base develop \
  --head "$BRANCH_PREFIX/v$NEW_VERSION" \
  --title "chore: prepare release v$NEW_VERSION" \
  --body "Automated release PR for v$NEW_VERSION"
