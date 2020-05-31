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
    }
})

module.exports = mongoose.model("task", TaskSchema);