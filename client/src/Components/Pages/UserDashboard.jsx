import Header from "../UserDashboard/Header"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import PostCollection from "../Common/PostCollection";
import userLogo from '../../resouces/user_logo.png'
import MainFeaturedPost from "../UserDashboard/MainFeaturedPost";
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import Grid from '@mui/material/Grid';
import Sidebar from "../UserDashboard/Sidebar";
import FeaturedPost from "../UserDashboard/FeaturePost";
import CampaignCard from "../Common/CampaignCard";
import PostsForUser from "../UserDashboard/PostsForUser";
import InfluencerInfoDrawer from "../Common/InfluencerInfoDrawer";
import { getTopInfluencers } from "../../Services/influencersApi";


const UserDashboard = () => {
    const navigate = useNavigate();
    const [topInfluencers, setTopInfluencers] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [influencerId, setInfluencerId] = useState();
    const handleOpenInfluencerInfoDrawer = (influencerId) => {
        setOpenDrawer(true);
        setInfluencerId(influencerId);
    }
    useEffect(()=>{
        const getTopTenInfluencers = async()=>{
            const result  = await getTopInfluencers()
            if(result?.status === 200){
                setTopInfluencers(result.data)
            }
        }
        getTopTenInfluencers()
    }, [])
    const mainFeaturedPost = {
        title: 'Title of a longer featured blog post',
        description:
          "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'main image description',
        linkText: 'Continue reading…',
      };
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    const sidebar = {
        title: 'About Dream Big',
        description:
          'Drema is a social vehicle media app which connects us with car brands and influencers on the same page. Where influencers market the campaign launched by the car brands and we can analayze the content created but the influencers agains that launched campaign. By this we can have a better idea about the perfect vehicle for our needs.',
        topInfluencers: [
          { name: 'March 2020', id: '123123123123123123123132' },
          { name: 'February 2020', id: '123123123123123123123132' },
          { name: 'January 2020', id: '123123123123123123123132' },
          { name: 'November 1999', id: '123123123123123123123132' },
          { name: 'October 1999', id: '123123123123123123123132' },
          { name: 'September 1999', id: '123123123123123123123132' },
          { name: 'August 1999', id: '123123123123123123123132' },
          { name: 'July 1999', id: '123123123123123123123132' },
          { name: 'June 1999', id: '123123123123123123123132' },
          { name: 'May 1999', id: '123123123123123123123132' },
          { name: 'April 1999', id: '123123123123123123123132' },
        ],
        social: [
          { name: 'GitHub', icon: GitHubIcon },
          { name: 'Twitter', icon: TwitterIcon },
          { name: 'Facebook', icon: FacebookIcon },
        ],
      };
    useEffect(() => {
      if(sessionValue === null){
        navigate('/login');
    }else if(sessionValue.role === "dreambig.influencer") {
        navigate('/influencer-dashboard');
    } else if(sessionValue.role === "dreambig.user"){
        navigate('/user-dashboard');
    }else if(sessionValue.role === "dreambig.brand"){
      navigate('/brand-dashboard');
  }
    }, []);
    const featuredPosts = [
        {
          title: 'Featured post',
          date: 'Nov 12',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random?wallpapers',
          imageLabel: 'Image Text',
        },
        {
          title: 'Post title',
          date: 'Nov 11',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random?wallpapers',
          imageLabel: 'Image Text',
        },
      ];

     
        return <>
        <Header userLogo={userLogo}/>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Container maxWidth="lg">
        Trending by your favourite influencers

        <Grid container spacing={4}>

            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container>
          <Grid item md={7} sx={{ mt: 3 }}>
            Latest on Dream Big
            <PostsForUser/>
          </Grid>
          <Grid item md={5} sx={{ mt: 3 }}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              topInfluencers={topInfluencers}
              social={sidebar.social}
              handleOpenInfluencerInfoDrawer={handleOpenInfluencerInfoDrawer}
            />
          </Grid>
          </Grid>
         <InfluencerInfoDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} influencerId={influencerId}/>
        </Container>
        
        
    </>
    
    
}


export default UserDashboard