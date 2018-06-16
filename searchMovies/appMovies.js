// const yargs = require('yargs');
const movies = require('./searchMovies');
// const server = require('../server');


var moviess = (mov, callback) =>{ 
    movies.searchMovies(mov, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    callback(undefined, {
        Title: results.Title,
        Released: results.Released,
        Poster: results.Poster,
        Awards: results.Awards
      });
  }
});
};


module.exports.moviess = moviess;