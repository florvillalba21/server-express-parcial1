const User     = require("../models/Users");
// const db      = require('mongoose')
const bcrypt   = require('bcrypt');
const ctrlUser = {};


ctrlUser.getUsers = async (req, res)=> {
    const users = await User.fin()

    return res.json(users)
}

ctrlUser.postUser = async (req, res)=> {
    const {username, password: passRecibida} = req.body
    const passEncriptada = bcrypt.hashSync(passRecibida, 10)

    const newUser = new User({
        username,
        password: passEncriptada
    });

    const user = await newUser.save()

    return res.json({
        msg: "usuario cargado correctamente",
        user
    })

}

ctrlUser.putUser = async (req, res)=> {
    const userId = req.params.id
    const {username, password, isActive,... otraInfo} = req.body;
    const info = {username, password, isActive}

    try {
        const infoUpdate = await User.findByIdAndUpdate(userId, info ,{new: true});

        return res.json({
            msg : 'Usuario actualizado :)'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'no se ha podido actualizar :c'
        })
    }
}

ctrlUser.deleteUser = async (req, res)=> {
    const userId = req.params.id
    const {username, password, isActive, ... otraInfo} = req.body;
    const info = {username, password, isActive}

    try {
        const infoRemove = await User.findByIdAndRemove(userId, info,(err, doc));
        return res.json({
            msg: 'usuario removido :D'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'operacion malio sal :c'
        })
        
    }
}

module.exports = ctrlUser