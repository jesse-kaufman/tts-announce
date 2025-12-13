/** @file Commitlint configuration. */

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        // Workspaces / scripts
        "config",
        "frontend",
        "backend",
        "shared",
        "scripts",
        // Additional allowed scopes
        "deps",
        "release",
        "changelog",
      ],
    ],
  },
}
