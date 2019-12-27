module.exports = {
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/packages/[^/]+/build/'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  moduleNameMapper: {
    '^@react-story-rich/([^/]+)/(.*)': '@react-story-rich/$1/src/$2',
    '^@react-story-rich-ui/([^/]+)/(.*)': '@react-story-rich-ui/$1/src/$2',
  },
};
