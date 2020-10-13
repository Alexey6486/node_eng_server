import mongoose, { Schema, Document } from "mongoose";
const validator = require('validator');
const bcrypt = require('bcryptjs');

export interface UserInterface extends Document {
    name: string
    email: string
    password: string
    isAdmin: boolean
    isVerified: boolean
    photo: string
    added: Date
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        maxlength: [200, 'A user\'s name must have maximum 200 characters.'],
        minlength: [1, 'A user\'s name must have minimum 1 character.'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        lowercase: true,
        validate: [validator.isEmail, 'Email is not valid.']
    },
    password: {
        type: String,
        required: [true],
        minlength: [8, 'Min password length is 8 symbols.'],
        select: false // hide password
    },
    isAdmin: {
        type: Boolean,
        required: [true],
        default: false
    },
    isVerified: {
        type: Boolean,
        required: [true],
        default: false
    },
    photo: {
        type: String,
        required: [false],
        default: 'no photo'
    },
    added: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre<UserInterface>('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.isPasswordCorrect = function(candidatePassword: string, userPassword: string): boolean {
    return bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model<UserInterface>('User', userSchema);

module.exports = User;