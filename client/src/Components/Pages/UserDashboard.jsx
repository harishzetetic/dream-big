import Header from "../UserDashboard/Header"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import userLogo from '../../resouces/user_logo.png'
import MainFeaturedPost from "../UserDashboard/MainFeaturedPost";
import Container from '@mui/material/Container';
import {Grid, Box, Typography} from '@mui/material';
import Sidebar from "../UserDashboard/Sidebar";
import FeaturedPost from "../UserDashboard/FeaturePost";
import PostsForUser from "../UserDashboard/PostsForUser";
import InfluencerInfoDrawer from "../Common/InfluencerInfoDrawer";
import { getTopInfluencers } from "../../Services/influencersApi";
import { fetchAllPostForUser, userStatics } from "../../Services/userApi";
import { flushSync } from 'react-dom';
import Statics from "../UserDashboard/Statics";
import styled from "@emotion/styled";



const StaticsContainer = styled(Box)`
display:flex;
align-items:center;
`
const UserDashboard = () => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate();
    useEffect(() => {
        if(sessionValue === null){
          navigate('/login');
      }else if(sessionValue.role === "dreambig.influencer") {
          navigate('/influencer-dashboard');
      }else if(sessionValue.role === "dreambig.brand"){
        navigate('/brand-dashboard');
    }
      }, [navigate, sessionValue]);

    const [allPost, setAllPost]= useState();
    const [statics, setStatics]= useState();
    const [topInfluencers, setTopInfluencers] = useState()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [influencerId, setInfluencerId] = useState();
    const handleOpenInfluencerInfoDrawer = (influencerId) => {
        setOpenDrawer(true);
        setInfluencerId(influencerId);
    }
    const [isReady, setIsReady] = useState(false)
    
    const getTopTenInfluencers = async()=>{
        const result  = await getTopInfluencers()
        if(result?.status === 200){
            setTopInfluencers(result.data)
        }
    }
    const getPost = async()=>{
        const result = await fetchAllPostForUser();
        if(result?.status === 200){
            setAllPost(result.data)
        }
    }
    const getStatics = async()=>{
        const result = await userStatics();
        if(result?.status === 200){
            setStatics(result.data)
        }
    }
    useEffect(()=>{
        if(!isReady){
                getTopTenInfluencers();
                getPost();
                getStatics();
        }
    }, [])
    useEffect(()=>{
        if(allPost && topInfluencers && statics) setIsReady(true) 
    }, [allPost, topInfluencers, statics])
    
   
 
    const sidebar = {
        title: 'About Dream Big',
        description:
          'Drema is a social vehicle media app which connects us with car brands and influencers on the same page. Where influencers market the campaign launched by the car brands and we can analayze the content created but the influencers agains that launched campaign. By this we can have a better idea about the perfect vehicle for our needs.',
          social:[]
      };
    

     
        return <>
        {isReady && 
        <>
        <Header userLogo={userLogo}/>
        <MainFeaturedPost post={allPost[0]} />
        <Container maxWidth="lg">
            <StaticsContainer>
        <Statics title="Total Influencers" value={statics.totalInfuencers} emoji={'🔥'}/>
        <Statics title="Total Campaigns" value={statics.totalCampaign} emoji={'🤑'}/>
        <Statics title="Total Vehicle" value={statics.totalVehicle} emoji={'🚗'}/>
        <Statics title="Trending Vehicle" value={statics.trendingVehicle} emoji={'✋'}/>
            </StaticsContainer>
       
        <span style={{fontWeight:1000, fontSize: '23px', borderLeft: '5px solid black', paddingLeft: '5px', marginBottom: '30px'}}>Trending by your favourite influencers</span>

        
      
        <Grid container spacing={4}>

            
              <FeaturedPost post={allPost[0]} />
              <FeaturedPost post={allPost[1]} />
            
          </Grid>
          <Grid container>
          <Grid item md={7} sx={{ mt: 3 }}>
            <span style={{fontWeight:1000, fontSize: '23px', borderLeft: '5px solid black', paddingLeft: '5px'}}>Latest on Dream Big</span>
            <PostsForUser handleOpenInfluencerInfoDrawer={handleOpenInfluencerInfoDrawer}/>
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
            {!isReady && <>Data model is not ready yet</>}
    </>
}


export default UserDashboard;