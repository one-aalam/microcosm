const AddressSubSchema = {
    addressType: {
        type:String,
        default: "Residence"
    },
    city: {
        type:String
    },
    state:{
        type:String
    },
	country:{
        type:String
    },
	pincode:{
        type:Number,
        required:true
    }
}


module.exports = AddressSubSchema;