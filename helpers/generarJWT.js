//Importacion de la libreria
import jwt from 'jsonwebtoken'


//Funcion para generar el token por medio del is y nombre
const generarJWT = (id,nombre) =>{
    return jwt.sign({id,nombre},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export default generarJWT