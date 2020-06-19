// if (process.env.NODE_ENV !== 'production') {
//  require('dotenv').config();
// }
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const routes = require('./routes/index');


const app = express();

// set ejs as template
app.set('view engine', 'ejs');

// set path to ejs files public files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// routes
app.use(express.json());
app.use(routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(createError(404));
});


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 5000, () => console.log('Server Started'));
