const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    number: {
        type: String,
        required: true,
        minlength: 11,
    },
}, { timestamps: true });

userSchema.virtual('farm', {
    ref: 'Farm',
    localField: '_id',
    foreignField: 'user',
    justOne: true
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, 'privateKey');
    return token;
};

//  Prevent OverwriteModel Error here too
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
