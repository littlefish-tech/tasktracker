const express = require("express");
const router = express.Router();


//@route POST api/tasks
//@desc add tasks
//@access private


router.post("/", (req, res) => {
    res.send("add a task");
})

module.exports = router