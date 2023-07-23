



import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {Box, Button} from '@mui/material';


function MainFeaturedPost(props) {
  const { post } = props;
  const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  return (
    
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography>&#x2022;  Sponsord</Typography>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
             {post.postTitle}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            {post?.description && post.description.slice(0, 250)}...
            </Typography>
           
            <Link href={`/user-dashboard/${post._id}/${post.assignedCampaignId}/${sessionValue.sub}`} target='_blank'>
            <Button size="large" variant="contained">View Post</Button>

            </Link>
            <br/><br/>
            {'By '}{post.creatorName} 
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;