/************************************************************************* *
 * BTI325– test 3 *
 * I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this assignment has been copied manually or electronically from any other source. *  (including 3rd party web sites) or distributed to other students. *
 *  *  Name: yunseok Choi  Student ID:  148765175  Date:  Nov 10th
 * Your app’s URL (from Cyclic Heroku)
 * that I can click to see your application:  *
https://maroon-elk-garb.cyclic.app/ *  * *************************************************************************/
const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 5500;
const data = require('./data-service');
const path = require('path');
const fs = require('fs');
const { engine } = require('express-handlebars');

// handle bar engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',

    helpers: {
      navLink: function (url, options) {
        return (
          '<li' +
          (url == app.locals.activeRoute ? ' class="active" ' : '') +
          '><a href=" ' +
          url +
          ' ">' +
          options.fn(this) +
          '</a></li>'
        );
      },

      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error('Handlebars Helper equal needs 2 parameters');
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);
app.set('view engine', '.hbs');

app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = route == '/' ? '/' : route.replace(/\/$/, '');
  next();
});

app.get('/', function (req, res) {
  res.render('home', { layout: 'main' });
});

app.get('/BSD', function (req, res) {
  res.render('students', { layout: 'main' });
});

app.get('/allStudents', function (req, res) {
  data
    .getStudents(req.params.value)
    .then((data) => {
      res.render('students', { layout: 'main' });
    })
    .catch((err) => {
      res.render('student', { message: 'no results' });
    });
});

app.get('/GPA', function (req, res) {
  data
    .highGPA(req.params.value)
    .then((data) => {
      res.render('student', { layout: 'main' });
    })
    .catch((err) => {
      res.render('student', { message: 'no results' });
    });
});
app.get('/HOME', function (req, res) {
  res.render('home', { layout: 'main' });
});
/**************** error init **************/
app.get('*', function (req, res) {
  res.send('Error 404: page not found.');
});

//setup http server to listen on HTTP_PORT
data
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () =>
      console.log(`Express http server listening on ${HTTP_PORT}`)
    );
  })
  .catch((e) => console.log(e));
