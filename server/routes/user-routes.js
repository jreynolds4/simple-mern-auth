const User = require('../models/user');
const jwtSecret = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/public/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })

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
            } if(!user) {
                res.send({message: 'user not found'});
            } else {
                console.log('USER: ', user);
                req.logIn(user, err => {
                    //console.log(user);
                    
                    User.findOne({ 'local.email': user.local.email }).then(user => {
                        const token = jwt.sign({ id: user.local.email }, jwtSecret.secret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in',
                            user: user
                        });
                    });
                });
            }
        })(req, res, next);
    });

};




