const Tasks     = require("../models/Tasks");
const bcrypt   = require('bcrypt');
const ctrlTask = {};


ctrlTask.getTasks = async (req, res)=> {
    const tasks = await Tasks.find()

    return res.json(tasks)
}


ctrlTask.postTask = async(req, res)=>{
    const {tittle, description, userId} = req.body

    const newTask = new Tasks ({
        tittle,
        description,
        userId
    })

    const task = await newTask.save()
    
    return res.json({
        msg : "Tarea agregada :D",
        task
    })
}

ctrlTask.putTask = async (req, res)=> {
    const taskId = req.params.id
    const {tittle, description, userId} = req.body;
    const info = {tittle, description}

    try {
        const infoUpdate = await User.findByIdAndUpdate(userId, info ,{new: true});

        return res.json({
            msg : 'tarea modificada :)'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'no se ha podido actualizar :c'
        })
    }
}


module.exports = ctrlTask;