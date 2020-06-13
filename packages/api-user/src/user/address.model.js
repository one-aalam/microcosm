const { model, Schema } = require('mongoose');
const AddressSubSchema = require('./address.schema');

const AddressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    ...AddressSubSchema,
    createdAt    :{ type: Date },
    updatedAt    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});

module.exports = model('Address', AddressSchema);