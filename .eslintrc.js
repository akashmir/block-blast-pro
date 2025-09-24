module.exports = {
  extends: ['expo'],
  rules: {
    // Allow == instead of === for game logic
    'eqeqeq': 'off',
    // Allow unused variables in development
    '@typescript-eslint/no-unused-vars': 'warn',
    // Allow React hooks in non-component functions for game logic
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    // Allow unreachable code in mock services
    'no-unreachable': 'warn',
    // Allow unused expressions in color constants
    'no-unused-expressions': 'warn',
  },
};