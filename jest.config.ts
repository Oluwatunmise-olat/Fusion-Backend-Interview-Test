import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  setupFiles: [],
  setupFilesAfterEnv: ["./tests/db-init.ts"],
  testTimeout: 20000,
};

export default config;
