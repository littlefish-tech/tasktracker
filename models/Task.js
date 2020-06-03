const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    taskname: {
        type: String,
        required: true
    },
    assigner: {
        type: String
    },
    deadline: {
        type: Date
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "normal"
    }
})

module.exports = mongoose.model("task", TaskSchema);