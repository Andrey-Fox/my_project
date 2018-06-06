const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// const searchMovies = require('./searchMovies/appMovies');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  // console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{});
  next();
});

/* app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});
app.get('/mycolection', (req, res) => {
  res.render('MyColection.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/weatherforecast', (req, res) => {
  res.render('weatherforecast.hbs');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
// consol.log(request.body.Movies)

app.listen(3000);
