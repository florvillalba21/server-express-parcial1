const User     = require("../models/Users");
const task     = require('../models/Tasks')
// const db      = require('mongoose')
const bcrypt   = require('bcrypt');
const ctrlUser = {};


ctrlUser.getUsers = async (req, res)=> {
    // const {uid} = req.body
    // console.log(uid)
    const resp = await User.findOne({isActive: true})
    return res.json({
        msg: "usuarios activo",
        resp
    })
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
    const userId = req.user
    const {username, password, _id, ... otraInfo} = req.body;
    
    const passEncryp = bcrypt.hashSync(password, 10)
    const info = {username, password: passEncryp, isActive}

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
    const userId = req.user._id
    
    // const info = {isActive: false}

    try {
        const searchTasks = await task.find({userId: userId})

        if(searchTasks != ""){
            const taskRemove = await task.deleteMany({userId: userId})
        }
        const infoRemove = await User.findByIdAndUpdate(userId, {isActive: false});
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