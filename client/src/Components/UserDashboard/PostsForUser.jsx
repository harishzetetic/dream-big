import { Avatar, Fab, Grid, Rating, Link, styled, Typography, Button, CardContent, CardActions, Card, Box, Divider } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState, useEffect } from 'react'
import { deepPurple } from '@mui/material/colors';
import { getSingleCampaignById } from '../../Services/influencersApi';
import CommentBox from '../Common/CommentBox';
import { fetchAllPostForUser, likePost, disLikePost } from '../../Services/userApi';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import {NotificationManager} from 'react-notifications';



const StatusIcon = styled(CircleIcon)`
color: #28ed6a;
height:0.5em;
width:0.5em;
`
const Status = styled(Typography)`
    display:flex;
    align-items:center;

`

const InfluencerInfo = styled(Box)`
display:flex;
align-items:center;
margin:8px 0;
`

const ViewCampaignBtn = styled(Button)`
float:right
`

const YouTubeVideo = styled(Box)`
border: 1px solid black;
overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;

  & iframe{
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`
const BrandNameBox = styled(Box)`
display:flex;
align-items:center;
`
const Highlights = styled(Grid)`
display:flex;
align-items:center;
flex-direction:column;
padding: 20px;
border-left: 3px solid green;
    & :first-child{
        font-weight: 1000;
    }
`

const BrandInfoBox = styled(Box)`
    display:flex;
    align-items:center;
`
const StyledVerifiedIcon = styled(VerifiedIcon)`
color:#638aff;
`

const LikeDisLikeGrid = styled(Grid)`
    display:flex;
    align-items:center;
`

const PostContainer = styled(Box)`
    max-height: 70vh;
    overflow:auto;
`

const PostsForUser = ({handleOpenInfluencerInfoDrawer}) => {
    const [allPosts, setAllPosts] = useState([])
    useEffect(()=>{
        const fetchAllPost = async() => {
            const result =  await fetchAllPostForUser()
           if(result?.status === 200){
            setAllPosts(result.data.reverse())
           }
        }
        fetchAllPost()
    }, [])
    return <PostContainer>
    {allPosts.map(item => (
        <PostCard key={item._id} post={item} handleOpenInfluencerInfoDrawer={handleOpenInfluencerInfoDrawer}/>
        
    ))}
    </PostContainer>
}


const PostCard = (props) => {
    
    const sessionValue = JSON.parse(sessionStorage.getItem('user'));
    const [assignedCampaign, setAssignCampaign] = useState({})
    const [post, setPost] = useState(props.post)
    const [likeStatus, setLikeStatus] = useState(!!post.likes.find(i => i.id === sessionValue.sub))
    const [disLikeStatus, setDisLikeStatus] = useState(!!post.dislikes.find(i => i.id === sessionValue.sub))

    useEffect(()=>{
        const assignedCampaignID=post.assignedCampaignId;
        const getCampaignById = async()=>{
            const result = await getSingleCampaignById({campaignId: assignedCampaignID})
            if(result?.status === 200){
                setAssignCampaign(result.data)
               }
        }
        getCampaignById();
    },[])

    const postLikeHandler = async() => {
        const result = await likePost({likeStatus, postId:post._id, userID:sessionValue.sub, userName:sessionValue.name})
        if(result?.status === 200){
            setLikeStatus(!!result.data.likes.find(i => i.id === sessionValue.sub))
            setPost(result.data)
            NotificationManager.success('Success', 'Wonderful! Your feedback has been recorded');
        } else {
            NotificationManager.error('Error', 'Error while recorded your feedback');

        }
    }
    const postDisLikeHandler = async() => {
        const result = await disLikePost({disLikeStatus, postId:post._id, userID:sessionValue.sub, userName:sessionValue.name})
        if(result?.status === 200){
            setDisLikeStatus(!!result.data.likes.find(i => i.id === sessionValue.sub))
            setPost(result.data)
            NotificationManager.success('Success', 'Wonderful! Your feedback has been recorded');
        } else {
            NotificationManager.error('Error', 'Error while recorded your feedback');

        }
    }
    return (
        <>
        <InfluencerInfo>
        <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={props.handleOpenInfluencerInfoDrawer}>{`${post.creatorName.split(' ')[0][0]}${post.creatorName.split(' ')[1][0]}`}</Avatar> &nbsp; &nbsp;
            <Typography>
                {post.creatorName} <em>posted a {post.postType} Post on</em> {post.createdDate}

            </Typography>
        </InfluencerInfo>
        
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {post.postTitle.slice(0, 80)}...
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Published on {post.createdDate}
                    </Typography>
                    <Typography variant="body2">
                        {post?.description && post.description.slice(0, 150).concat('....') || ''}

                    </Typography>
                    {post.embedId &&
                        <YouTubeVideo>
                        <iframe
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${post.embedId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </YouTubeVideo>
                    }
                

                    <Grid container xs={12} sm={12}>
                        <Grid item xs={3}>
                            <Highlights>
                                
                                <Typography>Brand</Typography>
                                <BrandNameBox>
                                <Typography>{assignedCampaign.brandName} </Typography>
                                <StyledVerifiedIcon />
                                </BrandNameBox>
                                
                            </Highlights>

                        </Grid>
                        <Grid item xs={3}>
                            <Highlights>
                                <Typography>Model Name</Typography>
                                <Typography>{assignedCampaign.modelName}</Typography>
                            </Highlights>


                        </Grid>
                        <Grid item xs={3}>
                            <Highlights>
                                <Typography>Model Number</Typography>
                                <Typography>{assignedCampaign.modelId}</Typography>
                            </Highlights>

                        </Grid>
                        <Grid item xs={3}>
                            <Highlights>
                                <Typography>Fuel Type</Typography>
                                <Typography>{assignedCampaign.fuelType}</Typography>
                            </Highlights>
                        </Grid>
                    </Grid>
                    <br />
                    <BrandInfoBox>


                        <Typography>{post.likes.length} Likes | {post.comments.length} Comments</Typography>
                    </BrandInfoBox>

                </CardContent>
                <CardActions>
                    <Grid container xs={12}>
                        {sessionValue.role === "dreambig.user" && 
                        <LikeDisLikeGrid item xs={6}>
                        <>
                            <Box>
                            <Checkbox 
                                icon={!likeStatus ? <FavoriteBorder />: <Favorite />} 
                                checkedIcon={likeStatus ? <Favorite />:<FavoriteBorder />} 
                                value={likeStatus} 
                                onClick={postLikeHandler}
                            />
                            </Box> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Box>
                            <Checkbox 
                                icon={!disLikeStatus ? <ThumbDownOutlinedIcon />: <ThumbDownIcon />} 
                                checkedIcon={disLikeStatus ? <ThumbDownIcon />:<ThumbDownOutlinedIcon />} 
                                value={disLikeStatus} 
                                onClick={postDisLikeHandler}
                            />

                            </Box>
                        </>

                    </LikeDisLikeGrid>
                        }
                        
                        <Grid item xs={6}>
                            <Link href={`/user-dashboard/${post._id}/${post.assignedCampaignId}/${sessionValue.sub}`} target='_blank'>
                            <ViewCampaignBtn size="large" variant="outlined"><VisibilityOutlinedIcon />&nbsp;View Post</ViewCampaignBtn>
                            </Link>
                            
                        </Grid>
                    </Grid>

                </CardActions>
                {sessionValue.role === "dreambig.user" && 
                <CommentBox comments={post.comments} post={post}/>
                }
            </Card>
        </>
    );
}

export default PostsForUser;