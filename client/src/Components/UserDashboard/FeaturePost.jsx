import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {Link, Button, Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { post } = props;
const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.postTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.createdDate}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipses'}}>{post.description}</div>
            </Typography>
            <Typography variant="subtitle1" color="primary">
              By {post.creatorName} on {post.createdDate}
            </Typography>
            <br/>
            <Link href={`/user-dashboard/${post._id}/${post.assignedCampaignId}/${sessionValue.sub}`} target='_blank'>
            <Button size="small" variant="contained">View Post</Button>

            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={''}
            alt={'image-label'}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;