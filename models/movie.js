// Importacion de la libreria de la base de datos
import mongoose from "mongoose";

// Definicion del esquema de la coleccion de peliculas
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    fullplot: {
        type: String,
        trim: true,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    countries: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    trailer: {
        type:String,
        trim:true,
        required:true
    }
}, {
    timestamps: true
});

// Definimos el nombre de la coleccion
const movie = mongoose.model("movie", movieSchema);
export default movie; 