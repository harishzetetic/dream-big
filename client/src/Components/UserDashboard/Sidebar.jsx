import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Avatar, Box, styled, Button} from'@mui/material';
import {deepOrange} from '@mui/material/colors'
import { followInfluencer, unfollowInfluencer } from '../../Services/userApi';
import { useState } from 'react';
import {NotificationManager} from 'react-notifications';


function Sidebar(props) {
  const { topInfluencers, description, social, title, handleOpenInfluencerInfoDrawer } = props;

  const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  const [currentSubscriptions, setCurrentSubscriptions] = useState(sessionValue.subsriptions)
  const InfluencerBox = styled(Box)`
    display:flex;
    align-items:center;
    margin-bottom:5px;
    
  `
  const FollowButton = styled(Button)`
  margin-left:auto
  `

  const follow = async(influencerId, influencerName) => {

    const result = await followInfluencer({sub: sessionValue.sub, influencerId })
    if(result?.status === 200){
      // use info is coming has subscriptions
      setCurrentSubscriptions(result.data.subsriptions)
      NotificationManager.success('Success', `You have successfully followed ${influencerName}`);
    } else{
      NotificationManager.error('Error', `Error while followed ${influencerName}`);

    }
  }
  const unfollow = async(influencerId, influencerName) => {

    const result = await unfollowInfluencer({sub: sessionValue.sub, influencerId })
    if(result?.status === 200){
      setCurrentSubscriptions(result.data.subsriptions)
      NotificationManager.success('Success', `You have successfully unfollowed ${influencerName}`);
    } else{
      NotificationManager.error('Error', `Error while unfollowed ${influencerName}`);

    }
  }
  return (
    <Grid item md={12} sx={{ml: 5}}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Top Influencers on Dream Big
      </Typography>
      {topInfluencers.map((influencer) => (
        <InfluencerBox key={influencer._id}>
          <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={()=>handleOpenInfluencerInfoDrawer(influencer._id)}>{influencer.firstName[0]}{influencer.lastName[0]}</Avatar>
          <Typography> &nbsp;&nbsp; {influencer.firstName}</Typography>
          {currentSubscriptions && currentSubscriptions.includes(influencer._id) 
          ? <FollowButton variant="outlined"  onClick={() => unfollow(influencer._id, `${influencer.firstName} ${influencer.lastName}`)}>UnFollow</FollowButton> : 
          <FollowButton variant="contained" onClick={() => follow(influencer._id, `${influencer.firstName} ${influencer.lastName}`)}>Follow</FollowButton>}
          
          
        </InfluencerBox>
        
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;