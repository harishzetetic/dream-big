import mongoose from "mongoose";


const campaignSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    start:{
        type:String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    targetAudience:{
        type: String,
    },
    rewards:{
        type: Number,
    },
    modelName:{
        type: String,
    },
    modelId:{
        type: String
    },
    pricing:{
        type:Number
    },
    fuelType:{
        type:String
    },
    url:{
        type:String
    },
    objective:{
        type:String
    },
    subscribers:{
        type:Array
    },
    likes:{
        type:Array
    },
    dislikes:{
        type:Array
    },
    comments:{
        type:Array
    },
    sales:{
        type:Number
    },
    subscribersRating:{
        type: Number
    },
    createdBy:{
        type: String
    },
    brandName:{
        type:String
    },
    createdDate:{
        type: String
    },
    status:{
        type: Boolean
    }
})

const CampaignModel = mongoose.model('campaigns', campaignSchema);

export default CampaignModel;