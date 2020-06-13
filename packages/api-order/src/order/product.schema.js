const ProductSubSchema = {
    _id: {
        type: String,
        required:true
    },
    category      :{
        type:String
    },
    name          :{
        type:String, required: true,
        max: 100
    },
    price :{
        type: Number,
        required: true
    },
}


module.exports = ProductSubSchema;