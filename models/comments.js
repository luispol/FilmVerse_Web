//Importacion de la libreria para la base de datos
import mongoose from "mongoose";

//Definicion del esquema para la coleccion de comentarios
const commentSchema = mongoose.Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"movie"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuarios"
    },
    nombre: {
        type: mongoose.Schema.Types.String,
        ref:"Usuarios"
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const comment = mongoose.model("comment", commentSchema);
export default comment;