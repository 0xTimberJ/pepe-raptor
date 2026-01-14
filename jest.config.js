/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/__tests__"],
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: {
                module: "commonjs",
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                moduleResolution: "node",
                strict: true,
                skipLibCheck: true,
            },
        }],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
};
