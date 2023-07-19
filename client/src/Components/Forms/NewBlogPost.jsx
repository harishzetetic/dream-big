import BrandSignUp from "./BrandSignUp";
import { Box, Grid, TextField, Button, MenuItem, Snackbar, Alert, Typography, styled } from "@mui/material"
import { useState, useEffect } from "react";
import { postType } from "../../constants";
import { signUpInfluencer, getInfluencerAssignedCampaign } from "../../Services/influencersApi";
import { signUpBrand } from "../../Services/brandsApi";

/*
<iframe width="560" 
    height="315" 
    src="https://www.youtube.com/embed/NBBDSosV3UY" 
    title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; 
    clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen></iframe>
*/

const NoteText = styled(Typography)`
    font-size: 12px
`


const NewBlogPost = () => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'));
    const [campaignPostType, setPostType]= useState('Blog')
    const [assignCampaigns, setAssignCampaigns] = useState()


    useEffect(()=>{
        const getAssignedCampaign = async () => {
            const result = await getInfluencerAssignedCampaign(sessionValue)
        }
    }, [])
    const INITIAL_RESPONSE = { show: false, message: '', type: 'success'}
    const [apiResponse, setApiResponse] = useState(INITIAL_RESPONSE)
    const [isFormValid, setIsFormValid] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            brandName: data.get('brandName'),
            firstName : data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            totalCampaigns:[],
            activeCampaigns:[],
            closedCampaigns:[],
            role:'dreambig.brand'
        }
        if(dataSetForApi.brandName === 'None'){
            setApiResponse({
                show: true,
                message: 'State value must be provided',
                type: 'error'
            })
            return;
        }
        const result = await signUpBrand(dataSetForApi)
        if(result?.status === 200){
            if(result.data.msg){
                setApiResponse({
                    show: true,
                    message: result.data.msg,
                    type: 'success'
                })
            } else if(result.data._id){
                setApiResponse({
                    show: true,
                    message: 'Congratulations! Your brand account has been created. Kindly Login for proceed',
                    type: 'success'
                })
            } else {
                setApiResponse({
                    show: true,
                    message: 'Seems to be an error while registering your details',
                    type: 'error'
                })  
            }

        } else {
            setApiResponse({
                show: true,
                message: 'Oops! Error occured',
                type: 'error'
            })  
        }
    };


    return <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
        <TextField
          id="postType"
          required
          fullWidth
          select
          label="Type"
          name="postType"
          onChange={(e)=>{setPostType(e.target.value)}}
        >        
          {postType.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
        </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
        <TextField
          id="postType"
          required
          fullWidth
          select
          label="Assign Campaign"
          name="postType"
          defaultValue={postType[0]}          
        >        
          {postType.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
        </TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField
                autoComplete="given-name"
                name="postTitle"
                required
                fullWidth
                id="postTitle"
                label="Post Title"
                autoFocus
            />
        </Grid>
        <Grid item xs={12}>
            {campaignPostType === 'Blog' &&
                <TextField
                required
                fullWidth
                id="lastName"
                label="Description"
                name="lastName"
                autoComplete="family-name"
                multiline
                rows={8}
            />
            }
            
        </Grid>
        
        
        <Grid item xs={12}>
        {campaignPostType === 'Video' && 
            <TextField
            required
            fullWidth
            id="email"
            label="YouTube Video Embed ID"
            name="email"
            autoComplete="email"
        />
        }
            
                         <NoteText>Only one account can be created per brand. Duplicate accounts would be rejected.</NoteText>

        </Grid>

        <Grid item xs={12}>
        {campaignPostType === 'Blog' &&
             <TextField
             fullWidth
             id="email"
             label="Other URL"
             name="email"
             autoComplete="email"
            
         />
        }
        </Grid>
       
       
    </Grid>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!isFormValid}
    >
        Publish 
    </Button>

</Box>
}

export default NewBlogPost;