module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
    ],
};