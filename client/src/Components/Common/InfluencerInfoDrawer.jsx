import { Button, Drawer, Box, styled, Typography } from "@mui/material"
import React from 'react'
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import {useEffect, useState} from 'react'
import { getInfluencerById } from "../../Services/influencersApi";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';



const StyledBox = styled(Box)`
width: 400px
`

const Name = styled(Box)`
    text-align:center;
    background-color:#1565c0;
    padding: 50px 10px;
    font-size: 28px;
    color:white;

`
const SocialMedia = styled(Box)`
display:flex;
align-items:center;
margin-left:50px;
margin-top:10px;
text-align:center;
`
const MiddleTypoGraphy = styled(Typography)`
    margin-top:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center
`


const InfluencerInfoDrawer = ({openDrawer, setOpenDrawer, influencerId}) => {
const anchor = 'right';
const [influencer, setInfuencer] = useState();
useEffect(()=>{
        const getInfluencer = async () => {
            const result = await getInfluencerById({influencerId})
            if(result?.status === 200){
                setInfuencer(result.data)
            }
        }
        getInfluencer()
    
}, [openDrawer, influencerId])

const social = [
    { name: 'Facebook', icon: FacebookIcon , url: influencer.facebookURL},
    { name: 'Instagram', icon: InstagramIcon , url: influencer.instagramURL},
    { name: 'YouTube', icon: YouTubeIcon , url: influencer.youtubeURL},
  ]
return  <React.Fragment key={anchor}>
    {console.log(influencer)}
    {influencer && 
        <Drawer
        anchor={anchor}
        open={openDrawer}
        onClose={()=>setOpenDrawer(false)}
      >
         <StyledBox>
            <Name>
            {influencer.firstName} {influencer.lastName}
            <Typography>{influencer.city}</Typography>
            </Name> 
            
            <SocialMedia>
            {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href={network.url}
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
      
            </SocialMedia>
            <MiddleTypoGraphy><strong>{influencer.email}</strong></MiddleTypoGraphy>
            <MiddleTypoGraphy> <Button variant="contained" size="large">Follow</Button></MiddleTypoGraphy>
           

         </StyledBox>
      </Drawer>
    
    }

</React.Fragment>

}

export default InfluencerInfoDrawer