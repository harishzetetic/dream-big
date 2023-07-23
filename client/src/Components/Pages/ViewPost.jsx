

import { useParams } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import VerifiedIcon from '@mui/icons-material/Verified';
import IconButton from '@mui/material/IconButton';


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Tooltip, Container, Link, Avatar, Grid, Typography, Button, styled, CardContent, CardActions, Card, Box } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState, useEffect } from 'react'
import { deepPurple } from '@mui/material/colors';
import CommentBox from '../Common/CommentBox';
import { likePost, disLikePost, getSinglePostById, getUserBySub } from '../../Services/userApi';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { NotificationManager } from 'react-notifications';
import Header from "../UserDashboard/Header";
import GradeIcon from '@mui/icons-material/Grade';

import { getSingleCampaignById } from "../../Services/influencersApi";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { pinInterest } from "../../Services/userApi";

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

const ViewPost = () => {

    let { postId, assignedCampaignId, userId } = useParams();
    const [sessionValue, setSessionValue] = useState()

    const [post, setPost] = useState()
    const [campaign, setCampaign] = useState()
    const [likeStatus, setLikeStatus] = useState(post && sessionValue && !!post.likes.find(i => i.id === sessionValue.sub) || false)
    const [disLikeStatus, setDisLikeStatus] = useState(post && sessionValue && !!post.dislikes.find(i => i.id === sessionValue.sub) || false)


    const [openInterestDialog, setOpenInterestDialog] = useState(false)
    const [openBuyDialog, setOpenBuyDialog] = useState(false)
    const getPost = () => {
        const getPostById = async () => {
            const result = await getSinglePostById({ postId })
            if (result?.status === 200) {
                setPost(result.data)
            }
        }
        getPostById();
    }
    const getCampaign = () => {
        const getCampaignById = async () => {
            const result = await getSingleCampaignById({ campaignId: assignedCampaignId })
            if (result?.status === 200) {
                setCampaign(result.data)
            }
        }
        getCampaignById();
    }
    const getUser = () => {
        const getUserById = async () => {
            const result = await getUserBySub({ sub: userId })
            if (result?.status === 200) {
                sessionStorage.setItem('user', JSON.stringify(result.data))
                setSessionValue(result.data)
            }
        }
        getUserById();
    }
    useEffect(() => {
        getUser();
        getPost();
        getCampaign();
    }, [])

    const postLikeHandler = async () => {
        const result = await likePost({ likeStatus, postId: post._id, userID: sessionValue.sub, userName: sessionValue.name })
        if (result?.status === 200) {
            setLikeStatus(!!result.data.likes.find(i => i.id === sessionValue.sub))
            setPost(result.data)
            NotificationManager.success('Success', 'Wonderful! Your feedback has been recorded');
        } else {
            NotificationManager.error('Error', 'Error while recorded your feedback');

        }
    }
    const postDisLikeHandler = async () => {
        const result = await disLikePost({ disLikeStatus, postId: post._id, userID: sessionValue.sub, userName: sessionValue.name })
        if (result?.status === 200) {
            setDisLikeStatus(!!result.data.likes.find(i => i.id === sessionValue.sub))
            setPost(result.data)
            NotificationManager.success('Success', 'Wonderful! Your feedback has been recorded');
        } else {
            NotificationManager.error('Error', 'Error while recorded your feedback');

        }
    }
    if (post && campaign && sessionValue) {
        return (
            <div style={{ height: '100vh' }}>
                <Container maxWidth="lg">
                    <Card sx={{ minWidth: '100%' }}>

                        <CardContent>
                            <Typography>Created By {post.creatorName}</Typography>
                            <br />
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
                                            <Typography>{campaign.brandName} </Typography>
                                            <StyledVerifiedIcon />
                                        </BrandNameBox>

                                    </Highlights>

                                </Grid>
                                <Grid item xs={3}>
                                    <Highlights>
                                        <Typography>Model Name</Typography>
                                        <Typography>{campaign.modelName}</Typography>
                                    </Highlights>


                                </Grid>
                                <Grid item xs={3}>
                                    <Highlights>
                                        <Typography>Model Number</Typography>
                                        <Typography>{campaign.modelId}</Typography>
                                    </Highlights>

                                </Grid>
                                <Grid item xs={3}>
                                    <Highlights>
                                        <Typography>Fuel Type</Typography>
                                        <Typography>{campaign.fuelType}</Typography>
                                    </Highlights>
                                </Grid>
                            </Grid>
                            <br />
                            <Typography>Resouces: <Link href={post.otherURL}>{post.otherURL}</Link></Typography>

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
                                                    icon={!likeStatus ? <FavoriteBorder /> : <Favorite />}
                                                    checkedIcon={likeStatus ? <Favorite /> : <FavoriteBorder />}
                                                    value={likeStatus}
                                                    onClick={postLikeHandler}
                                                />
                                            </Box> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Box>
                                                <Checkbox
                                                    icon={!disLikeStatus ? <ThumbDownOutlinedIcon /> : <ThumbDownIcon />}
                                                    checkedIcon={disLikeStatus ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                                                    value={disLikeStatus}
                                                    onClick={postDisLikeHandler}
                                                />

                                            </Box>
                                        </>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Tooltip title="Post your interest" placement="top-end">
                                        <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>setOpenInterestDialog(true)}>
                                            <GradeIcon />
                                        </IconButton>
                                        </Tooltip>
                                        
                                        &nbsp;&nbsp;&nbsp;
                                        <Tooltip title="Marked Purchased" placement="top-end">

                                        <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>setOpenBuyDialog(true)}>
                                            <CurrencyRupeeIcon />
                                        </IconButton>
                                        </Tooltip>
                                       
                                    </LikeDisLikeGrid>
                                }

                            </Grid>

                        </CardActions>
                        {sessionValue.role === "dreambig.user" &&
                            <CommentBox comments={post.comments} post={post} />
                        }
                    </Card>
                </Container>
                {openInterestDialog && <InterestDialog openInterestDialog ={openInterestDialog} setOpenInterestDialog={setOpenInterestDialog} post={post} campaign={campaign}/>}
                {openBuyDialog && <BuyDialog openBuyDialog ={openBuyDialog} setOpenBuyDialog={setOpenBuyDialog}post={post} campaign={campaign} />}

            </div>
        );

    }
    else {
        return <>Post could not fetched!</>
    }

}


export default ViewPost;



const InterestDialog = ({ openInterestDialog, setOpenInterestDialog, post, campaign}) => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    const [phone, setPhone] = useState()
    const submit=async(e)=>{
        e.preventDefault();
        if(phone && (phone.length === 10) && (/^[0-9]+$/.test(phone))){

            const apiDataSet = {
                userId:sessionValue.sub, 
                userPicture: sessionValue.picture,
                campaignId: campaign._id,
                brandId:campaign._id,
                modewName:campaign.modelName,
                postId: post._id,
                influencerId: post.creatorID,
                userName: sessionValue.name,
                userEmail: sessionValue.email,
                phone,
                interest: true
    
            }
            const result = await pinInterest(apiDataSet) ;
            if(result?.status === 200){
                if(result.data?.msg){
                    NotificationManager.error('Already Recorded', 'Your interest has already been recorded');
                } else {
                    NotificationManager.success('Done', 'Your interest has been recorded');
    
                }
            }

           
        } else{

            NotificationManager.error('Oops!', `Our system not recognized this phone number. Please try with correct one.`);
        }
       
    }
  return (
    <div>
      <Dialog open={openInterestDialog} onClose={()=>setOpenInterestDialog(false)}>
        <DialogTitle>Sound Good!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wow {sessionValue.name}, Its good that you have interest in this vehicle. Kindly leave your contact number. So that the team of this campaign influencer can contact with you. Dont worry we care about your privacy and your mobile number will not share with anyone else.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phone"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenInterestDialog(false)}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const BuyDialog = ({ openBuyDialog, setOpenBuyDialog, post, campaign}) => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    const [phone, setPhone] = useState('')
    const [purchaseId, setPurchaseId] = useState('')
    const submit=async(e)=>{
        e.preventDefault();
        if((phone.length === 10) && (/^[0-9]+$/.test(phone)) && purchaseId.length){

            const apiDataSet = {
                userId:sessionValue.sub, 
                userPicture: sessionValue.picture,
                campaignId: campaign._id,
                brandId:campaign._id,
                modewName:campaign.modelName,
                postId: post._id,
                influencerId: post.creatorID,
                userName: sessionValue.name,
                userEmail: sessionValue.email,
                phone,
                purchase: true,
                purchaseId
    
            }
            const result = await pinInterest(apiDataSet) ;
            if(result?.status === 200){
                if(result.data?.msg){
                    NotificationManager.error('Already Recorded', 'Your interest has already been recorded');
                } else {
                    NotificationManager.success('Done', 'Your interest has been recorded');
    
                }
            }

           
        } else{

            NotificationManager.error('Oops!', `Provided data is not correct`);
        }
       
    }
  return (
    <div>
      <Dialog open={openBuyDialog} onClose={()=>setOpenBuyDialog(false)}>
        <DialogTitle>Sound Good!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wow {sessionValue.name}, Congrats for this vehicle. You have a great choice. Please provide your purchaseId to avail benifits.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phone"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="purchaseId"
            label="Purchase Number"
            type="purchaseId"
            fullWidth
            variant="standard"
            value={purchaseId}
            onChange={(e)=>setPurchaseId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenBuyDialog(false)}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
