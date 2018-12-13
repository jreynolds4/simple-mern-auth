// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '462084690857412', // your App ID
        'clientSecret'  : '9deb73456b5ad9f0e24a5c6c08481844', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileFields'   : ['emails', 'first_name', 'last_name']
    },

    'googleAuth' : {
        'clientID'      : '697687551469-rlh2mb71fqr262pln35mbj0ssvr4ctr0.apps.googleusercontent.com',
        'clientSecret'  : 'fOlpLO0DTUeZA9OvGvH70TZ-',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
