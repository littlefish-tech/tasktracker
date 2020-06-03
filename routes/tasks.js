const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Task = require("../models/Task");


//@route Get api/tasks
//@desc get all tasks
//@access private


router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({
            deadline: -1,
        });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route post api/tasks
//@description add task
// @access private

router.post(
    "/", [
    auth, [
        check("taskname", "The task name is required").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { taskname, assigner, deadline, description, type } = req.body;

    try {
        const newTask = new Task({
            taskname,
            assigner,
            deadline,
            description,
            type,
            user: req.user.id
        });
        const task = await newTask.save();
        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }

}
);

//@route Put api/tasks/:id
//@desc Update task
//@access Private

router.put("/:id", auth, async (req, res) => {
    const { taskname, assigner, deadline, description, type } = req.body;
    //build task object

    const taskField = {};
    if (taskname) taskField.taskname = taskname;
    if (assigner) taskField.assigner = assigner;
    if (deadline) taskField.deadline = deadline;
    if (description) taskField.description = description;
    if (type) taskField.type = type;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: "Task not found" });

        // make sure user owns the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401), json({ msg: "Not authorized" });
        }
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskField },
            { new: true },
        );
        res.json(task);
    }
    catch (err) {
        console.err(err.message);
        res.status(500).send("Server Error");
    }
});

//@route delete api/task/:id
//@desc delete task
//@access private

router.delete("/:id", auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: "Task not found" });

        //Make sure the user owns task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        await Task.findByIdAndRemove(req.params.id)
        res.json({ msg: "Task removed" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router