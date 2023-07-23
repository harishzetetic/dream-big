
import { Fab, Grid, Rating, Link, styled, Typography, Button, CardContent, CardActions, Card, Box } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {useState} from 'react'
import { likeDislike, joinCampaign, leaveCampaign } from '../../Services/influencersApi';
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
const ViewCampaignBtn = styled(Button)`
float:right
`

const JoinCampaignBtn = styled(Button)`
float:right;
margin-right:10px;
`
const LeaveCampaignBtn = styled(Button)`
float:right;
margin-right:10px;
`

const RatingBox = styled(Box)`
    padding: 15px 0;
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
const BrandInfo= styled(Typography)`
    color:#638aff;
`
const StyledVerifiedIcon = styled(VerifiedIcon)`
color:#638aff;
`

const LikeDisLikeGrid= styled(Grid)`
    display:flex;
    align-items:center;
`

export default function CampaignCard(props) {
    const [campaign, setCampaign] = useState(props.campaign)
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    const isBrand = sessionValue.role === 'dreambig.brand'
    const getRating = () => {
        const totalVotes = campaign.likes.length + campaign.dislikes.length;
        if(totalVotes === 0  && campaign.likes.length === 0){
            return 0;
        }
        const likePerentage = (campaign.likes.length * 100) / totalVotes;
        switch(likePerentage){
            case (likePerentage < 25):
              return 1;
            case (likePerentage < 45 && likePerentage > 25):
              return 2;
            case (likePerentage < 65 && likePerentage > 45):
              return 3;
            case (likePerentage < 85 && likePerentage > 65):
              return 4;
            case (likePerentage > 85):
              return 5;
        }
    }
    
    const likeDislikeCampaign = async (vote, campaignId) => {
        const userId = sessionValue._id;
        const userName = `${sessionValue.firstName} ${sessionValue.lastName}`
        const result = await likeDislike({vote, campaignId, userId, userName}) 
        if(result?.status === 200){
            setCampaign(result.data)
        }
    }

    const joinThisCampaign = async()=>{
        const data ={
            joinerId: sessionValue._id,
            joinerName: `${sessionValue.firstName} ${sessionValue.lastName}`,
            campaignId: campaign._id,
            campaignTitle: campaign.title
        }
        const result = await joinCampaign(data);
        if(result?.status === 200){
            NotificationManager.success('Success', 'You have successfully joined the campaign');

            setCampaign(result.data)
        }
    }

    const leaveThisCampaign = async()=>{
        const data ={
            joinerId: sessionValue._id,
            joinerName: `${sessionValue.firstName} ${sessionValue.lastName}`,
            campaignId: campaign._id,
            campaignTitle: campaign.title
        }
        const result = await leaveCampaign(data);
        if(result?.status === 200){
            NotificationManager.success('Success', 'You have successfully leave the campaign');

            setCampaign(result.data)
        }
    }

    return (
        <Card sx={{ minWidth: '100%' }}>
            <CardContent>

                <Status sx={{ fontSize: 15 }} color="text.secondary">
                    <StatusIcon />
                    &nbsp; {campaign.status ? 'Active' : 'Inactive'}
                </Status>
                <Typography variant="h5" component="div">
                    {campaign.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {campaign.start} - {campaign.end}
                </Typography>
                <Typography variant="body2">
                    {campaign.objective}

                </Typography>
                <RatingBox>
                    <Typography><span className='db'>DB</span> Rating: </Typography>
                    <Rating name="read-only" value={getRating() || 0} readOnly />
                </RatingBox>

                <Grid container xs={12} sm={12}>
                    <Grid item xs={3}>
                        <Highlights>
                        <Typography>Rewards</Typography>
                        <Typography>INR. {campaign.rewards}</Typography>
                        </Highlights>
                        
                    </Grid>
                    <Grid item xs={3}>
                    <Highlights>
                        <Typography>Pricing per Unit</Typography>
                        <Typography>INR. {campaign.pricing}</Typography>
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
                        <Typography>Fuel Type</Typography>
                        <Typography>{campaign.fuelType}</Typography>
                        </Highlights>
                    </Grid>
                </Grid>
                <br/>
                <BrandInfoBox>
                <Typography>By </Typography>&nbsp;
                <Link to="/"><BrandInfo color="text.secondary">Tata Motors </BrandInfo></Link>
                
                &nbsp; <StyledVerifiedIcon />&nbsp;
                <Typography>{campaign.likes.length} Likes | {campaign.dislikes.length} Dislikes | {campaign.subscribers.length} Marketers</Typography>
                </BrandInfoBox>
                
            </CardContent>
            <CardActions>
                


            
            <Grid container xs={12}>
                
                <LikeDisLikeGrid item xs={6}>
                {!isBrand && 
                <>
                <Box>
                <Fab aria-label="like" size='small' onClick={()=>likeDislikeCampaign('like', campaign._id)}>
                    <FavoriteIcon />
                 </Fab>
                </Box> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Box>
                <Fab aria-label="dislike" size='small' onClick={()=>likeDislikeCampaign('dislike', campaign._id)}>
                    <ThumbDownOffAltIcon />
                 </Fab>
                </Box>
                </>
                }
            </LikeDisLikeGrid>
                
            {!isBrand && 
                <Grid item xs={6}>
                <ViewCampaignBtn size="large" variant="outlined"><VisibilityOutlinedIcon />&nbsp;View Campaign</ViewCampaignBtn>
    
                {!isBrand && (campaign.subscribers.find(item => item.joinerId === sessionValue._id)) ?
                <LeaveCampaignBtn size="large" variant="outlined" onClick={leaveThisCampaign}><GroupAddIcon />&nbsp;Leave Campaign</LeaveCampaignBtn> 
                : <JoinCampaignBtn size="large" variant="contained" onClick={joinThisCampaign}><GroupAddIcon />&nbsp;Join Campaign</JoinCampaignBtn>
    }
                </Grid>
            }
            
        </Grid>
            
                

            </CardActions>
        </Card>
    );
}