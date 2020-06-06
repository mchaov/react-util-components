const path = require("path");
// const rootDir = path.resolve(process.cwd());
// console.log(rootDir);

module.exports = (rootDir) => {
    return {
        "globals": {
            "ts-jest": {
                "tsConfig": "testing-tsconfig.json"
            }
        },
        "testURL": "http://localhost/",
        "cacheDirectory": path.join(rootDir, ".jest-cache"),
        "rootDir": rootDir,
        "roots": [
            "<rootDir>/src"
        ],
        "testMatch": [
            "**/__tests__/**/*.+(ts|tsx|js)",
            "**/?(*.)+(spec|test).+(ts|tsx|js)"
        ],
        "transform": {
            "^.+\\.(ts|tsx)$": "ts-jest"
        },
        "setupFiles": [
            path.resolve(process.cwd(), ".configs", "jestsetup.js")
        ],
        "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${path.resolve(process.cwd(), ".configs", "fileMock.js")}`,
            "\\.(css|less)$": `${path.resolve(process.cwd(), ".configs", "styleMock.js")}`
        },
        "verbose": true,
        "collectCoverage": false,
        "collectCoverageFrom": [
            "**/*.{ts,tsx}",
            "!**/node_modules/**",
            "!**/vendor/**",
            "!**/*.d.ts",
            "!**/dict.ts",
            "!**/config.ts",
            "!**/index.ts",
            "!**/index.tsx"
        ],
        "coverageDirectory": path.resolve(process.cwd(), "coverage"),
        "coverageThreshold": {
            "global": {
                "branches": 85,
                "functions": 85,
                "lines": 85,
                "statements": 85
            }
        }
    }
}