export default {
    preset: "jest-expo",
    testMatch: ["**/__tests__/**/*.js?(x)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [],
    moduleNameMapper: {
        "@wq/material-native": "<rootDir>/src/index.js",
    },
};
