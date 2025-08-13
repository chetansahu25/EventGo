const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const dbUser = await User.findOne({ email }).select("+password");
    console.log(dbUser);
    if (!dbUser) {
        return res.status(404).json({
            message: "User does not exist!",
        });
    }
    const isMatch = await bcrypt.compare(password, dbUser.password);
    console.log(isMatch);
    if (!isMatch) {
        console.log("Invalid credentials");
    }
    res.setHeader(
        "Authorization",
        `Bearer ${generateToken("access", savedUser)}`
    );
    res.cookie("refreshToken", `${generateToken("refresh", savedUser)}`, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, //for 30 Days
    });
    res.json({
        name: dbUser.name,
        message: "Login success",
        success: true
    })
}

module.exports = {
    handleUserLogin,
};
