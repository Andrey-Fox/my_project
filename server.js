const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require("body-parser");

const searchMovies = require('./searchMovies/appMovies');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post("/movies", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);

  var mov= request.body.Movie;
 
  searchMovies.moviess(mov, (errorMessage, res) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
var Title = JSON.stringify(res.Title, undefined, 2);      
var Released = JSON.stringify(res.Released, undefined, 2);
var Poster = JSON.stringify(res.Poster, undefined, 2);
var Awards = JSON.stringify(res.Awards, undefined, 2);

      console.log(Poster);
      console.log(JSON.stringify(res.Poster, undefined, 2));

      res.render('home.hbs', {
        Title: Title,
        Released: Released,
        Poster: Poster,
        Awards: Awards
        // welcomeMessage: 'Welcome to my website'
      });
    }
  });

//  console.log(request.body.Movie);
});



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

app.listen(3000);
