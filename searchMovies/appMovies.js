const yargs = require('yargs');
const movies = require('./searchMovies');

var express = require("express");
var bodyParser = require("body-parser");
 
var app = express();

app.post("/", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);

  // var note = notes.addNote(request.body);
  // console.log(request.body);
mov= request.body.Movie;
 console.log(request.body.Movie);
});


const argv = yargs
  .options({
    m: {
      demand: true,
      alias: 'movie',
      describe: 'Title of the movie',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

moviess = movies.searchMovies(mov, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});


module.exports.appMovies = Moviess;