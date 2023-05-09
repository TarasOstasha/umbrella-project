module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        node: true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "semi": ["error", "always"], // semicolon required
        //"quotes": ["error", "double"], // you must use only double quotes
        "no-var": "error" // no allowed using var variable
    }
};
