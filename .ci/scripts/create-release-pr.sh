#!/bin/bash
set -euo pipefail

git fetch origin
if git log origin/main..origin/develop --oneline | grep .; then
  gh pr create --base main --head develop \
    --title "chore: release to production" \
    --body "Merges develop into main for release."
else
  echo "No new commits to release."
fi
