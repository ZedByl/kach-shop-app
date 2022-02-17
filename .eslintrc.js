module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        es6: true,
        browser: true,
        'jest/globals': true
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:import/typescript'
    ],
    plugins: ['@typescript-eslint', 'react', 'jest'],
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
        project: 'tsconfig.json'
    },
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/prefer-default-export': 0,
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-use-before-define': ['error'],
        'jsx-a11y/href-no-hash': ['off'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-max-props-per-line': [1, { when: 'always' }],
        'react/jsx-indent-props': [2, 2],
        'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
        'react/jsx-tag-spacing': [
            'error',
            {
                beforeSelfClosing: 'always'
            }
        ],
        'react/jsx-props-no-spreading': ['off'],
        'react/prop-types': 0,
        'no-console': 'off',
        'import/no-cycle': 'off',
        'multiline-ternary': 0,
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 0,
        'indent': 'off',
        'no-useless-constructor': 'off',
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
        'no-use-before-define': 'off',
        semi: ['error', 'never']
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
                moduleDirectory: ['node_modules', 'src/']
            }
        }
    }
};
