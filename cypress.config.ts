import { defineConfig } from "cypress";
import codeCoverage from "@cypress/code-coverage/task";
export default defineConfig({
  env: {
    codeCoverage: {
      exclude: ["cypress/**/*.*", "**/_test_/**", "**/interfaces.ts"],
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      codeCoverage(on, config);
      return config;
    },
    baseUrl: "http://localhost:6010/",

  },
  video: false,

});
