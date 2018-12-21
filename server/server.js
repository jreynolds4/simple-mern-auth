const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const logger = require('morgan');
const port = process.env.PORT || 8080;

// connect to the database and load models
require('./models').connect(process.env.MONGODB_URI);
require('./passport/passport')(passport); // pass passport for configuration


const app = express();


app.use(express.static('./client/dist'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

// routes ======================================================================
require('./routes/user-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.set('port', (process.env.PORT || 8080));

app.listen(port, () => 
    console.log('Listening on port ' + port)
);