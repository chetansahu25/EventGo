const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const handleGetUser = (req, res) => {};

async function handleCreateUser(req, res) {
    try {
        const { name, email, phone, password, gender } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const newUser = new User({
            name,
            email,
            gender,
            phone,
            password,
        });
        const savedUser = await newUser.save();
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.setHeader(
            "Authorization",
            `Bearer ${generateToken("access", savedUser)}`
        );
        res.cookie("refreshToken", `${generateToken("refresh", savedUser,)}`, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, //for 30 Days
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: userResponse,
            },
            
        });
    } catch (error) {
        console.error("Registration error:", error);

        // Handle different types of errors
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors,
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

function handleDeleteUser(req, res) {}
function handleUpdateUser(req, res) {}

module.exports = {
    handleCreateUser,
    handleDeleteUser,
    handleGetUser,
    handleUpdateUser
};
