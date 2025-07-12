/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js", "json"],
	globals: {
		"^.+\\.ts$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.json"
			}
		]
	},
	testMatch: ["<rootDir>/test/**/*.(spec|test).ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@domain/(.*)$": "<rootDir>/src/domain/$1",
		"^@test/(.*)$": "<rootDir>/test/$1"
	},
	coverageDirectory: "<rootDir>/coverage",
	collectCoverageFrom: [
		"src/**/*.{ts,js}"
	]
};
