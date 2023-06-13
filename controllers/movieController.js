// Import movies model
import { request } from 'express';
import movie from "../models/movie.js";

// CRUD ACTIONS

// Obtenemos todas las peliculas para el carusel y las demas partes
const getAllMovies = async (request, response) => {
  const movies = await movie.find();
  response.json(movies);
};

//Obtener una pelicula en especifica
const getMoviesCard = async (request, response) => {

  const movies = await movie.find({ _id: request.query.id });
  // desde postman, ejemplo: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
  console.log(movies)
  response.json(movies);
};

//Agregar peliculas al sistema
const setMovie = async (request, response) => {
  const movies = new movie(request.body);
  console.log(request.body);
  try {
    const movieSave = await movies.save();
    console.log(movieSave);
    response.json(movieSave);
  } catch (error) {
    console.log(`An error ocurred while inserting the movie: ${error}`);
  }
};


//Editar una pelicula en especifica
const editMovie = async (request, response) => {
  try {
    // try in postman, Example: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
    const updatedMovie = await movie.findOneAndUpdate(
      { _id: request.query.id },
      request.body,
      { new: true }
    );
    response.json(updatedMovie);
  } catch (error) {
    console.log(`An error occurred while updating the movie: ${error}`);
    response.status(500).json({ error: 'Internal server error' });
  }
};


//Eliminar una pelicula en especifica
const deleteMovie = async (request, response) => {
  // Desde postman, ejemplo: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
  try {
    const deletedMovie = await movie.findOneAndDelete({ _id: request.query.id });
    response.json(deletedMovie);
  } catch (error) {
    console.log(`An error occurred while deleting the movie: ${error}`);
    response.status(500).json({ error: 'Internal server error' });
  }
};

// Buscar peliculas
const searchMovies = async (request, response) => {
  const { title } = request.body;
  try {
    console.log(title);
    const movies = await movie.find({ title: { $regex: title, $options: 'i' } });
    response.json(movies);
  } catch (error) {
    console.log(`An error occurred while searching for movies: ${error}`);
  }
};


// EXPORTACIONES
export {
  getAllMovies,
  getMoviesCard,
  setMovie,
  editMovie,
  deleteMovie,
  searchMovies
}
