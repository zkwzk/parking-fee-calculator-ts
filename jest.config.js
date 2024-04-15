module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/src', '<rootDir>/api-tests'],
    testMatch: ['**/__tests__/**/*.ts', "<rootDir>/tests/**/?(*.)(spec|test).{js,jsx,ts,tsx}"],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    }
  };