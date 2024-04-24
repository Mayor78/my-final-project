const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: String
}, {
    timestamps: true
});

// Middleware to hash password before saving
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         // Generate salt
//         const salt = bcrypt.genSaltSync(10);
//         // Hash the password
//         this.password = await bcrypt.hashSync(this.password, salt);
//     }
//     next(); // Continue with the next middleware or save operation
// });

// TODO: Add more validations or middleware as needed

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
