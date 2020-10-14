import mongoose, { Schema, Document } from "mongoose";
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

export interface UserInterface extends Document {
    name: string
    email: string
    password: string
    isAdmin: boolean
    isVerified: boolean
    photo: string
    added: Date
    passwordChangedAt: Date
    passwordResetToken: string
    passwordResetExpires: Date
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
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});

userSchema.pre<UserInterface>('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre<UserInterface>('save', async function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});

userSchema.methods.isPasswordCorrect = function(candidatePassword: string, userPassword: string): boolean {
    return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.hasPasswordBeenChanged = function(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const convertToTimestamp = +(this.passwordChangedAt.getTime() / 1000).toFixed();
        // if JWTTimestamp less that means that password has been changed after sent token issued
        return JWTTimestamp < convertToTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //console.log({resetToken}, this.passwordResetToken)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expires in 10 min

    return resetToken;
};

const User = mongoose.model<UserInterface>('User', userSchema);

module.exports = User;