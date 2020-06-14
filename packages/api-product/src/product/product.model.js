const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category      :[{type:String}],
    name          :{type:String, required: true, max: 100 },
    description   :{type:String},
    price         :{type: Number, required: true},
    type          :[{type:String}],
    fabric        :[{type:String}],
    size          :[{type:Number}],
    color         :[{type:String}],
    created_at    :{ type: Date },
    updated_at    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});

ProductSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Product', ProductSchema);