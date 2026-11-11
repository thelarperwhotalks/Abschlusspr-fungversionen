# Version snapshots

This folder contains complete fallback snapshots of the project source. Each version directory is a standalone copy of the runnable app at the point that version was created.

## Before a major change

1. Copy the complete current project source into a new directory named `vX.Y-short-name/`, using a semantic version and a concise feature name (for example, `v1.1-wissenstrainer/`).
2. Include application code, public assets, package manifests and lockfiles, and project configuration.
3. Exclude `node_modules`, `.next`, other build output, local environment files such as `.env*`, credentials, and secrets. Never put secrets in a snapshot.
4. Add the version, date, and summary to the root `VERSIONS.md` manifest and add a German summary to `CHANGELOG.md` using Keep a Changelog sections.
5. Add ready-to-paste release notes under `versions/release-notes/`.
6. Create a matching Git tag named `vX.Y` for the snapshot so a GitHub Release can point to that version. The tag and folder should use the same version number.

## Restore a snapshot

Copy the contents of the desired version directory back to the repository root, preserving the directory structure. Copy the contents, not the `vX.Y-short-name` folder itself. Restore the package manifest and lockfile together. Snapshot folders intentionally do not contain `.env` files or credentials; configure required environment variables separately, then install dependencies from the included lockfile before running the app.

## Existing snapshots

- `v1.0-baseline/` — initial complete source baseline for Verdun 1916, dated 2026-11-11.
- `release-notes/v1.0.md` — ready-to-paste release notes for the matching `v1.0` tag and GitHub Release.
