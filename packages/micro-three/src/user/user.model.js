const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username      :{type:String},
    password      :{type:String, required: true },
    token         :{type:String},
    created_at    :{ type: Date },
    updated_at    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});


module.exports = mongoose.model('User', UserSchema);