//Importacion de modelos
import Comments from "../models/comments.js";
import movies from "../models/movie.js";

const getComment = async (request, response) =>{

}

//Metodo para obtener los comentarios
const getComments = async (request, response) =>{
    const { id } = request.params;
    console.log(id)
    const movie = await movies.findById(id);
    console.log("find: " + movie + "Comentario ID") 

    if(!movie) {
        // Si no se encuentra la película, se devuelve un mensaje de error
        return response.status(404).json({msg:"Pelicula no encontrada"}) 
    }

    // Busca todos los comentarios relacionados con la película
    const comments = await Comments.find({ movie_id: movie._id }); 
    // Si algún comentario no coincide con el ID de la película, se devuelve un mensaje de error
    for (const comment of comments) {
        if (comment.movie_id.toString() !== movie._id.toString()) {
            return response.status(404).json({ msg: "Comentario no válido" }); 
        }
    }
    // carga todos los comentarios
    const allcomments = await Comments.find({ movie_id: movie._id }); 

    response.json({
        movie,
        allcomments 
    })
}

//Metodo para agregar un comentario
const setComment = async (request, response) =>{
    const { id } = request.params;
    console.log(id)
    const movie = await movies.findById(id);

    const comment = new Comments(request.body);
    comment.movie_id = movie._id;
    comment.nombre = request.usuario.nombre;
    comment.user_id = request.usuario._id;

    console.log("Request comment" + comment)
    try {
        const commentSave = await comment.save();
        response.json(commentSave);
    } catch (error) {
        console.log("Error al guardar comentario" + error);
    }
};




export {
    getComment,
    getComments,
    setComment,
}
