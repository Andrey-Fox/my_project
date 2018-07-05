const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require("body-parser");

// const searchMovies = require('./searchMovies/appMovies');
const searchMovies = require('./searchMovies/searchMovies');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});





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


app.post("/", urlencodedParser, function (req, res) {
  if(!req.body.Movie) return res.sendStatus(400);

else {
  var mov= req.body.Movie;
  let rest;
  searchMovies.searchMovies(mov, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {

      console.log(JSON.stringify(results, undefined, 2));
      rest = results;
      console.log("1" + rest);

 }    
//  res.sendStatus(200);
  var Title = (rest.Title);     
  var Released = (rest.Released);
  var Poster = (rest.Poster);
  var Awards = (rest.Awards);

  console.log("3" + Poster);

      res.render('homeaAndMovie.hbs', {
    Title: Title,
    Released: Released,
    Poster: Poster,
    Awards: Awards,
    welcomeMessage: 'Welcome to mi'
  });
  });
 
//  setTimeout(function(){



//   console.log("2" + rest);
//   console.log("3" + Released);
//  },1000);



// res.sendStatus(200);
      // res.render('homeaAndMovie.hbs', {
      //   // Title: Title,
      //   // Released: Released,
      //   // Poster: Poster,
      //   // Awards: Awards,
      //   welcomeMessage: 'Welcome to mi'
      // });
//  console.log(request.body.Movie);
}
});

app.listen(3010);
console.log('Server started on port 3010');
