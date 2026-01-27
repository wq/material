export default {
    preset: "jest-expo",
    testMatch: ["**/__tests__/**/*.js?(x)"],
    transformIgnorePatterns: [],
    moduleNameMapper: {
        "@wq/material-native": "<rootDir>/src/index.js",
    },
};
