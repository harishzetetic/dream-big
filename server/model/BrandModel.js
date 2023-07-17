import mongoose from "mongoose";


const brandSchema = mongoose.Schema({
    brandName:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true,
    },
    totalCampaigns:{
        type: Array,
    },
    activeCampaigns:{
        type: Array
    },
    closedCampaigns:{
        type:Array
    },
    role:{
        type:String
    }
})

const BrandModel = mongoose.model('brands', brandSchema);

export default BrandModel;