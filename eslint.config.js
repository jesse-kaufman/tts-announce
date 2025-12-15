/** @file Project-specific ESLint configuration. */
import buildConfig from "./eslint-config/index.js"

// ============================================
// Workspace-Specific Configurations
// ============================================
// Import resolvers and path aliases for each workspace package

const workspaces = [
  {
    name: "tts-announce",
    files: ["server.ts", "src/**"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        alias: {
          map: [
            ["#config", "./src/config/index.ts"],
            ["#controllers/*", "./src/controllers/*"],
            ["#errors", "./src/errors"],
            ["#middlewares/*", "./src/middlewares/*"],
            ["#routes/*", "./src/routes/*"],
            ["#services/*", "./src/services/*"],
            ["#types", "./src/types"],
            ["#utils/*", "./src/utils/*"],
          ],
        },
      },
    },
  },
]

// Build and export the complete ESLint configuration
const config = buildConfig(workspaces)

export default config
