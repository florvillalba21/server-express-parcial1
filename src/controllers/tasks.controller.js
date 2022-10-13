const Tasks     = require("../models/Tasks");
const bcrypt   = require('bcrypt');
const { findOne } = require("../models/Tasks");
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
        userId: req.user._id
    })

    const task = await newTask.save()
    
    return res.json({
        msg : "Tarea agregada :D",
        task
    })
}

ctrlTask.putTask = async (req, res)=> {
    const taskId = req.params.id
    const User = req.user._id
    
    const searchTask = await Tasks.findById(taskId)
    const {tittle, description} = req.body

    const infoUpdate = {tittle, description}
    

    try {
        if(toString(searchTask.userId) != User){
            return res.json({
                msg: "La tarea no es de usted"
            })
        }
        const infoTask = await Tasks.findByIdAndUpdate(taskId, infoUpdate, {new: true})

        if(!infoTask){
            return res.json({
                msg: "Tarea no encontrada"
            })
            
        }
        
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
    const User = req.user._id
    

    const searchTask = await Tasks.findById(taskId)
    

    try {
        if(toString(searchTask.userId) != toString(User)){
            return res.json({
                msg: "La tarea no es de usted"
            })
        }


        const delTask = await Tasks.findByIdAndRemove(taskId, {isDone: true})

        res.json({
            msg: "La tarea ha sido removida :D"
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: "ha ocurrido un error :c"
        })
    }
}


module.exports = ctrlTask;