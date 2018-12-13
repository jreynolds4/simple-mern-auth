const User = require('../models/user');
const jwtSecret = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    app.get('/api/hi', () => {
        console.log('Hi!!!');
    });

/*
    app.post('/api/register', (req, res, next)  => {
        passport.authenticate('local', (req, res) => {
            //if (err) {
            //    console.log('THIS IS AN ERROR!!!');
            //} else {
                res.send({
                    message: 'user created!',
                });
                console.log('user created!')
            //}
        });
    });*/

    app.post('/api/register', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message)
            } else {
                req.logIn(user, err => {
                    const data = {email: req.body.email, password: req.body.password};
                    User.findOne({ 
                        'local.email': user.email 
                    }).then(user => {
                        console.log('user created');
                        res.status(200).send({message: 'user created'});
                    });
                }); 
            }
        })(req, res, next);
    
    });

    app.post('/api/login', (req, res, next)  => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    User.findOne({ 'local.email': user.local.email }).then(user => {
                        const token = jwt.sign({ id: user.local.email }, jwtSecret.secret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in',
                        });
                    });
                });
            }
        })(req, res, next);
    });

};




