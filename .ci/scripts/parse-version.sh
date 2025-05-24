#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_FILE="${1:-$SCRIPT_DIR/../../package.json}"

jq -r '.version' "$PACKAGE_FILE"
