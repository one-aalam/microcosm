const ProductSubSchema = {
    id: {
        type: String,
        required:true
    },
    name:{
        type:String, required: true,
        max: 100
    },
    price :{
        type: Number,
        required: true
    },
    qty :{
        type: Number,
        required: true
    },
}


module.exports = ProductSubSchema;