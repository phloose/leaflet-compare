module.exports = {
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$",
    transform: {
        "^.+\\.js?$": "babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
    moduleFileExtensions: ["js"],
    collectCoverage: true,
};
