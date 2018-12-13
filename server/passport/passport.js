
const jwtSecret =  require('../config');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

// load all the things we need
const LocalStrategy    = require('passport-local').Strategy;

// load up the user model
const User       = require('../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// load the auth variables
const configAuth = require('../config/auth'); // use this one for testing

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        session: false,
    },
    function(email, password, done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false);

            else {
                console.log('PASSWORD: ' + password);
                console.log('USER: ' + user.local.password);
                bcrypt.compare(password, user.local.password).then(response => {
                    if (response !== true) {
                        console.log('passwords do not match');
                        return done(null, false);
                    }
                    console.log('user found & authenticated');
                    return done(null, user);
                }).catch(error => {
                    console.log(error);
                });
            }
        });

    }));

    // =========================================================================
    // REGISTER ============================================================
    // =========================================================================
    passport.use('register', new LocalStrategy({
        // by default, local strategy uses name, username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        session: false,
    },
    function(email, password, done) {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.email': email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser)
                    return done(null, false, {
                        message: 'That email is already taken.'
                    });

                //  We're not logged in, so we're creating a brand new user.
                else {

                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                       // create the user

                        let newUser = new User();

                        newUser.local.email    = email;
                        newUser.local.password = hashedPassword; 
                        
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    });
                }

            });

    }));

    // =========================================================================
    // JWT ================================================================
    // =========================================================================

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: jwtSecret.secret,
    };
      
    passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({ 
                username: jwt_payload.id,
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }}),
    );

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    


};
