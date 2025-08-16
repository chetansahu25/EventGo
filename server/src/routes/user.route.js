const express = require("express");
const {
    handleCreateUser,
    handleGetUser,
} = require("../controllers/user.controller");
const { handleUserLogin } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", handleGetUser)

router.post('/signup', handleCreateUser)

router.post('/login', express.urlencoded({ extended: true }), handleUserLogin )

module.exports = router;
