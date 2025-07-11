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
	testMatch: ["<rootDir>/test/**/*.(spec|test).ts"]
};
