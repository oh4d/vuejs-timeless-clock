module.exports = {
    extends: 'airbnb-base',
    "parserOptions": {
        "sourceType": "module"
    },
    'rules': {
        'indent': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'prefer-template': 0,
        'no-var': 0,
        'no-underscore-dangle': 0,
        'prefer-arrow-callback': 0
    },
};