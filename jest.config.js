module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  collectCoverageFrom: [
    'packages/**/src/*.js',
    '!*.config.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__test__/',
    '/__mocks__/',
    '/dist/'
  ]
};
