var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var authenticate = require('./authenticate');

var routes = require('./routes/index');
var users = require('./routes/users');
var contactRouter = require('./routes/contactRouter');
var communityRouter = require('./routes/communityRouter');

var app = express();

if (process.env.SECURE) {
    // Secure traffic only
    app.all('*', function(req, res, next) {
        console.log('req start: ', req.secure, req.hostname, req.url, app.get('port'));
        if (req.secure) {
            return next();
        };

        res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
    });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

var apiVersion = '/v1'; // yes, I could use some express plugin for this!
app.use(apiVersion + '/', routes);
app.use(apiVersion + '/users', users);
app.use(apiVersion + '/contacts', contactRouter);
app.use(apiVersion + '/community', communityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
