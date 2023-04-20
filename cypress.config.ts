import { defineConfig } from "cypress";
import codeCoverage from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      /*  require('@cypress/code-coverage/task')(on, config)*/
      codeCoverage(on, config);

      return config;
    },
    baseUrl: "http://localhost:6010/",
  },

  video: false,
});
