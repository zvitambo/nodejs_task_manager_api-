const Task =  require('./../models/Task');
const asyncWrapper = require("./../middleware/async");
const { createCustomError } = require("./../errors/custom-error");


const getAllTasks = asyncWrapper( async(req, res) => {  
    const tasks = await Task.find({});
    return res.status(200).json({ tasks }); 
});

const createTask = asyncWrapper(async(req, res) => {
 
    const task = await Task.create(req.body);
    res.status(201).json({ message: "Task Created", task: task });

});

const getTask = asyncWrapper(async(req, res) => {

    const {id: taskId } = req.params;
    const task = await Task.findOne({_id: taskId});
    if (!task) return next(createCustomError(`Task with Id: ${taskId} not found`, 404 ));
    return res.status(200).json(task)
  
});

const updateTask = asyncWrapper(async (req, res) => {

    const {id: taskId} = req.params;
    
    const {name, completed} = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {new: true, runValidators: true});
    //const task = await Task.findOne({ _id: taskId });
     if (!task)
       return res
         .status(404)
         .json({ message: `Task with Id: ${taskId} not found` });

    // task.name = name;
    // task.completed = completed;
    // await task.save()
    return  res.status(200).json(task);

});

const deleteTask = asyncWrapper(async(req, res) => {
 
    const {id: taskId} = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
     if (!task)
       return res
         .status(404)
         .json({ message: `Task with Id: ${taskId} not found` });
    return  res.status(200).json(task);
 
  
});




module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };