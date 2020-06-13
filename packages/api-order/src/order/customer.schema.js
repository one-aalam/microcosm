const CustomerSubSchema = {
    _id: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    }
}


module.exports = CustomerSubSchema;