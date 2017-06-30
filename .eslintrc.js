module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "html"
    ],
    "rules": {
        'linebreak-style': ['warn', 'windows'],
        'no-console': "warn",
        'no-underscore-dangle':"off",
        'one-var':"off",
        'no-param-reassign':"off",
        "indent": ["error", 4],
        'no-new': 'warn',
        "no-undef": 'warn',
        'no-plusplus':0,
        "max-len": ["error",200],
        "eol-last": ["error", "never"],
        "comma-dangle": "off",
        "newline-per-chained-call": "off",
        "no-unused-vars":"off",
    },
    settings: {
    }
};