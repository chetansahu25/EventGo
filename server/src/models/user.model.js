const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name atleast have two characters"],
        trim: true,
        match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "non-binary", "prefer-not-to-say"],
        default: "prefer-not-to-say",
        
    },

    email: {
        type: String,
        required: true,
        unique: true, // Creates unique index
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
        index: true, // Creates database index for faster queries
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        // unique: [true,"Phone number is linked with some other profile"],
        match: [/^\d{10,15}$/, 'Please enter a valid phone number']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationExpiresIn: {
        type: Date,
        select: false,
    },
});

UserSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash if password is present and modified
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Additional password strength validation before hashing
    if (user.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Check for password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(user.password)) {
      throw new Error('Password must contain at least one uppercase letter, lowercase letter, number, and special character');
    }

    // Hash the password
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS;
    user.password = await bcrypt.hash(user.password, parseInt(saltRounds));
    
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model('User', UserSchema)

module.exports =  User;
