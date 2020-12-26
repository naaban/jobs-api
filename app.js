/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:11
 * @modify date 2020-12-26 20:32:49
 * @desc [description]
 */
require('dotenv').config()


require('./utils/database')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users.route');
var jobRouter = require('./routes/job.route');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'images')));

app.use('/api/user', usersRouter);
app.use('/api/job', jobRouter);


module.exports = app;
