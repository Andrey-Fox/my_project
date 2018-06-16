const request = require('request');

var searchMovies = (movie, callback) => {

  var encodedMovie = encodeURIComponent(movie);
  var apikey = 'f4ce871';
  request({
      url: `http://www.omdbapi.com/?t=${encodedMovie}&apikey=${apikey}`,
      json: true
    }, (error, response, body) => {
      if(response.body.Response == 'False'){
        callback(response.body.Error);
      }else{
        callback(undefined, {
          Title: response.body.Title,
          Released: response.body.Released,
          Poster: response.body.Poster,
          Awards: response.body.Awards
        });
      }
    });
};

module.exports.searchMovies = searchMovies;