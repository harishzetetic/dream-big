import mongoose from "mongoose";


const staticsSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    userPicture:{
        type:String,
    },
    campaignId:{
        type:String,
        required: true
    },
    brandId:{
        type:String,
        required: true
    },
     modewName:{
        type:String,
        required: true
    },
    postId:{
        type:String,
        required: true
    },
    influencerId:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    userEmail:{
        type:String,
    },
    phone:{
        type:String,
        required: true
    },
    pruchaseId:{
        type:String,
    },
    interest:{
        type: Boolean
    },
    purchase: {
        type: Boolean
    }
    

})


const StaticsModel = mongoose.model('statics', staticsSchema);

export default StaticsModel;