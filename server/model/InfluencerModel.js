import mongoose from "mongoose";


const influencerSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    addressLine1:{
        type: String,
        required: true
    },
    addressLine2:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
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
    subscribedCampaigns:{
        type: Array,
    },
    activeCampaigns:{
        type: Array
    },
    successCampaigns:{
        type:Array
    },
    failedCampaigns:{
        type: Array
    },
    subscribers:{
        type: Array
    },
    rating:{
        type: Number
    },
    facebookURL:{
        type:String,
    },
    instagramURL:{
        type:String
    },
    youtubeURL:{
        type:String
    },
    appreciations:{
        type:Number
    },
    rewards:{
        type:Number
    },
    saleUnit:{
        type:Number
    },
    role:{
        type:String
    }
})

const InfluencerModel = mongoose.model('influencers', influencerSchema);

export default InfluencerModel;