module.exports = {
	verbose: true,
	bail: 3,
	testPathIgnorePatterns: ["/.history/"],
	transform: {
		"^.+\\.js?$": "babel-jest",
		"^.+\\.jsx?$": "babel-jest",
	},
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/src/__mocks__/fileMock.js",
		"\\.(scss|css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js", "jest-chain"],
};
