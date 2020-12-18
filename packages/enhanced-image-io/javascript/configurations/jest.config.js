module.exports = {
    rootDir: '../',
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: [
        'data',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleDirectories: [
        'node_modules',
        'source',
    ],
    moduleNameMapper: {
        "#cli/(.*)": "<rootDir>/source/cli/$1",
        "#commands/(.*)": "<rootDir>/source/commands/$1",
        "#data/(.*)": "<rootDir>/source/data/$1",
        "#objects/(.*)": "<rootDir>/source/objects/$1",
        "#services/(.*)": "<rootDir>/source/services/$1",
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/distribution/',
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
            // branches: 90,
            // functions: 95,
            // lines: 95,
            // statements: 95
        }
    },
    collectCoverageFrom: [
        'source/*.{js,ts}'
    ],
    testTimeout: 30000
}
