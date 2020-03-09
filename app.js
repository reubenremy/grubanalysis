var express = require('express'),
session = require('express-session'),
FileStore = require('session-file-store')(session);
path = require('path'),
cookieParser = require('cookie-parser'),
logger = require('morgan'),
es6renderer = require('express-es6-template-engine');
app = express();

//ENGINE
app.engine('html', es6renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
    // store: new FileStore(),
    secret: 'get rad',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))

const indexRouter = require('./routes/indexRoute');
app.use('/', indexRouter);

const usersRouter = require('./routes/usersRoute');
app.use('/users', usersRouter)

module.exports = app;
