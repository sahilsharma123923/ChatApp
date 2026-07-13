const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should contain more than 6 character"]
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return ;
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return;
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

const userModel = mongoose.model("User", userSchema)

module.exports = userModel