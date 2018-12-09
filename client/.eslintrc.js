module.exports = {

    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "serviceWorker": true,
    },

    "extends": "airbnb",

    "parser": "babel-eslint",

    "plugins": [
        "react-hooks"
    ],

    "rules": {
        "react/jsx-filename-extension": "off"
    }
};