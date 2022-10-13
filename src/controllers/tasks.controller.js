const Tasks     = require("../models/Tasks");
const bcrypt   = require('bcrypt');
const ctrlTask = {};


ctrlTask.getTasks = async (req, res)=> {
    
    const tasks = await Tasks.find({userId: req.user})

    return res.json(tasks)
}


ctrlTask.postTask = async(req, res)=>{
    const {tittle, description} = req.body
    
    const newTask = new Tasks ({
        tittle,
        description,
        userId: req.user
    })

    const task = await newTask.save()
    
    return res.json({
        msg : "Tarea agregada :D",
        task
    })
}

ctrlTask.putTask = async (req, res)=> {
    const taskId = req.params.id
    console.log(taskId)
    

    try {
        const infoUpdate = await Tasks.findByIdAndUpdate(taskId, {isDone: true} ,{new: true});

        return res.json({
            msg : 'tarea modificada :)'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'no se ha podido actualizar :c'
        })
    }
}

ctrlTask.deleteTask= async(req, res)=>{
    const taskId = req.params.id;

    try {
        const delTask = await Tasks.findByIdAndRemove(taskId)

        res.json({
            msg: "La tarea ha sido removida :D"
        })
    } catch (error) {
        res.json({
            msg: "ha ocurrido un error :c"
        })
    }
}


module.exports = ctrlTask;