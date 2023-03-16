export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
     "json",
     "text",
     "lcov",
     "clover"
   ],
  // Forces coverage to all files
  collectCoverageFrom: [
    "src/**/*.js",
    //Ignores index.js
    // Reason: the index.js file is nothing more than an execution file
    // there's no need to be validated since we'll validate all executions
    "!src/index.js"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: "50%",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules"]
};
