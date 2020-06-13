const { model, Schema } = require('mongoose');
const CustomerSubSchema =  require('./customer.schema');
const ProductSubSchema =  require('./product.schema');
const AddressSubSchema =  require('./address.schema');

const OrderSchema = new Schema({
    customer: CustomerSubSchema,
    totalOrderValue: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "IN_PROGRESS"
    },
    products: [
        ProductSubSchema
    ],
    addresses: [
        AddressSubSchema
    ],
    createdAt    :{ type: Date },
    updatedAt    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});


OrderSchema.virtual('id').get(function() {
    return this._id.toHexString();
})


module.exports = model('Order', OrderSchema);