import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postType:{
        type:String,
        required: true
    },
    assignedCampaign:{
        type:String,
        required: true
    },
    postTitle:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    embedId:{
        type: String,
    },
    otherURL:{
        type: String,
    },
    likes:{
        type: Array
    },
    comments:{
        type:Array
    },
    creatorName:{
        type:String,
        required: true
    },
    creatorID:{
        type:String,
        required: true
    },
    createdDate:{
        type:String,
        required: true
    },
    assignedCampaignId:{
        type:String,
        required: true
    },
})

const PostModel = mongoose.model('post', postSchema);

export default PostModel;