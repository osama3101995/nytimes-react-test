module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/src/**/*.(test|spec).(ts|tsx)'],
    testPathIgnorePatterns: ['/node_modules/', '/src/__e2e__/'],
    transformIgnorePatterns: ['node_modules/(?!axios)/'],
    moduleNameMapper: {
        "\\.(scss)$": "identity-obj-proxy"
    },

};