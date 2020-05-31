const express = require("express");
const router = express.Router();


//@route POST api/auth
//@desc get login users
//@access private


router.get("/", (req, res) => {
    res.send("user login")
});

module.exports = router;