const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");



// Tabla Pivot MoviesGenres
Movie.belongsToMany(Genre, {through: "moviesGenres"})
Genre.belongsToMany(Movie, {through: "moviesGenres"})

// Tabla Pivot MoviesActors
Movie.belongsToMany(Actor, {through: "moviesActors"})
Actor.belongsToMany(Movie, {through: "moviesActors"})

// Tabla Pivot MoviesDirectors
Movie.belongsToMany(Director, {through: "moviesDirectors"})
Director.belongsToMany(Movie, {through: "moviesDirectors"})