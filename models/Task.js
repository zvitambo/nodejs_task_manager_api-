const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        maxlength: [50, 'Maximun 50 characters allowed in name']},
    completed: {type: Boolean, default: false}
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;