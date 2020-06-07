const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    token         :{type:String},
    created_at    :{ type: Date },
    updated_at    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
})

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', UserSchema);