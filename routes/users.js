const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//@route POST api/users
//@desc register a user
//@access public
router.post("/", (req, res) => {
    res.send("register a user")
})

module.exports = router; 