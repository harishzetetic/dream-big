import { Avatar, Fab, Grid, Rating, Link, styled, Typography, Button, CardContent, CardActions, Card, Box, Divider } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useState, useEffect } from 'react'
import { deepPurple } from '@mui/material/colors';
import { fetchAllPostForInfluencer, getSingleCampaignById } from '../../Services/influencersApi';
import CommentBox from './CommentBox';

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
const BrandInfo = styled(Typography)`
    color:#638aff;
`
const StyledVerifiedIcon = styled(VerifiedIcon)`
color:#638aff;
`

const LikeDisLikeGrid = styled(Grid)`
    display:flex;
    align-items:center;
`


const PostCollection = () => {
    const [allPosts, setAllPosts] = useState([])
    const sessionValue = JSON.parse(sessionStorage.getItem('user'));
    // Currently we are fetching the blog post for influencers
    useEffect(()=>{
        const getPostForThisInfluencer = async() => {
            const result =  await fetchAllPostForInfluencer({influencerId: sessionValue._id})
           if(result?.status === 200){
            setAllPosts(result.data)
           }
        }
        getPostForThisInfluencer()
    }, [])
    return <>
    {allPosts.map(item => (
        <PostCard key={item._id} post={item}/>
        
    ))}
    </>
}

const PostCard = ({post}) => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'));
    const [assignedCampaign, setAssignCampaign] = useState({})
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
    return (
        <>
        <InfluencerInfo>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>{`${sessionValue.firstName[0]}${sessionValue.lastName[0]}`}</Avatar> &nbsp; &nbsp;
            <Typography>
                {post.creatorName} <em>posted a {post.postType} Post on</em> {post.createdDate}

            </Typography>
        </InfluencerInfo>
        
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {post.postTitle}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Published on {post.createdDate}
                    </Typography>
                    <Typography variant="body2">
                        {post.description}

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
                                <Fab aria-label="like" size='small' onClick={() => { }}>
                                    <FavoriteIcon />
                                </Fab>
                            </Box> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Box>
                                <Fab aria-label="dislike" size='small' onClick={() => { }}>
                                    <ThumbDownOffAltIcon />
                                </Fab>
                            </Box>
                        </>

                    </LikeDisLikeGrid>
                        }
                        
                        <Grid item xs={6}>
                            <ViewCampaignBtn size="large" variant="outlined"><VisibilityOutlinedIcon />&nbsp;View Post</ViewCampaignBtn>
                        </Grid>
                    </Grid>

                </CardActions>
                {sessionValue.role === "dreambig.user" && <CommentBox comments={post.comments} post={post}/>}
                
            </Card>
        </>
    );
}

export default PostCollection;