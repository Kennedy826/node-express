const Task = require('../models/task')  // import the Task model
const asyncWrapper = require('../Midlleware/asyncWrapper')  // import the asyncWrapper middleware

const getAllTasks = asyncWrapper(async ( req, res ) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

const  createTask= asyncWrapper(async ( req, res ) => {
   
        const task = await Task.create(req.body)
        res.status(201).json({task})
   
})

const getTask= async ( req, res ) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            const error = new Error(`No task with id : ${taskID}`)
            error.statusCode = 404
            return next(error)  
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    res.json({id:req.params.id})
}

const updateTask = async ( req, res ) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    } 

}

const deleteTask= async ( req, res ) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})    
    res.send('delete task')
}
    catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = { 
    deleteTask,
    getAllTasks,
    createTask,
    getTask,
    updateTask,     
}