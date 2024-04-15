module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/api-tests'],
    testMatch: ["<rootDir>/api-tests/**/?(*.)(spec|test).{js,jsx,ts,tsx}"],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    }
  };