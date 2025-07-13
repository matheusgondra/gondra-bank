/** @type {import('ts-jest').JestConfigWithTsJest} */
const baseConfig = require("./jest.config.js");

module.exports = {
	...baseConfig,
	testMatch: ["<rootDir>/test/**/*.test.ts"]
};
