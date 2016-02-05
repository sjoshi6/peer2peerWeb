var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var visitors = require('./routes/visitors');
var authentication = require('./routes/authentication');
var profile = require('./routes/profile')
var sessionConfig = require('./config/session.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(session({
    secret: sessionConfig.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/v1/', visitors);
app.use('/v1/', authentication);
app.use('/v1/', profile);

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

        // Handle the 404 error by flash message and redirect
        if (err.status == 404) {
            req.flash("error", "Page Not Found")
            res.redirect('/v1/profile')
        }

        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    // Handle the error by flash message and redirect
    if (err.status == 404) {

        req.flash("error", "Page Not Found")
        res.redirect('/v1/profile')
    }

    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
