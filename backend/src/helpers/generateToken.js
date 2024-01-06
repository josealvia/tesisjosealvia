const jwt = require ('jsonwebtoken');
const {JWT_SECRET}= require('../config')

/*const tokenSign = async (user)=>{
    return jwt.sign(
        {
            id: user.id,
            rol: user.role.nombrerol
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }

    );
}*/

const tokenSign = async (payload) => {
    try {
        // Firma el token utilizando el payload y la clave secreta
        const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Error al generar el token');
    }
};

const verifyToken = async(token)=>{
    try {
        return jwt.verify(token, JWT_SECRET)
        
    } catch (e) {
        return null
        
    }
}

module.exports={
    tokenSign,
    verifyToken
}