
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const validateJWT = async (req, res, next) => {
    // let token = req.headers.authorization;

    let token = req.headers.authorization
    
    
    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        })
    };
    
    // let token = auth.substring(7)

    try {
        const { uid } = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(uid)
        // console.log(user)

        if (!user) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en BD'
            });
        }

        
        if (!user.isActive) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        // Se añade la información del usuario al request para que pueda ser utilizada en el resto de middlwares
        req.user = user;

        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validateJWT;