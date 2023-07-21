import { Box, Grid, TextField, Button, MenuItem, Typography, styled } from "@mui/material"
import { useState, useEffect } from "react";
import { postType } from "../../constants";
import { getInfluencerAssignedCampaign } from "../../Services/influencersApi";
import { newBlogPost } from "../../Services/influencersApi";

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
    const [assignCampaigns, setAssignCampaigns] = useState([])


    useEffect(()=>{
        const getAssignedCampaign = async () => {
            const result = await getInfluencerAssignedCampaign({influencerId: sessionValue._id});
            if(result?.status === 200){
                setAssignCampaigns(result.data.subscribedCampaigns.map(item => {
                    return `${item.campaignId}<${item.campaignTitle}>`
                }));
            }
        }
        getAssignedCampaign()
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            postType: data.get('postType'),
            assignedCampaign : data.get('assignedCampaign'),
            postTitle: data.get('postTitle'),
            description: data.get('description'),
            embedId: data.get('embedId'),
            otherURL: data.get('otherURL'),
            likes:[],
            comments:[],
            creatorName:`${sessionValue.firstName} ${sessionValue.lastName}`,
            creatorID: sessionValue._id,
            createdDate:new Date().toDateString(),
            assignedCampaignId:data.get('assignedCampaign').split('<')[0]
        }
        const result = await newBlogPost(dataSetForApi);
        if(result?.status === 200){
            window.confirm('Congratulations! You blog post has been successfully created')

        } else {
            window.confirm('There is some problem with your post creation. Please try again later')
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
          id="assignedCampaign"
          required
          fullWidth
          select
          label="Assign Campaign"
          name="assignedCampaign"
        >        
          {assignCampaigns && assignCampaigns.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
        </TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField
                autoComplete="postTitle"
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
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
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
            id="embedId"
            label="YouTube Video Embed ID"
            name="embedId"
            autoComplete="embedId"
        />
        }
            
                         <NoteText>Only one account can be created per brand. Duplicate accounts would be rejected.</NoteText>

        </Grid>

        <Grid item xs={12}>
        {campaignPostType === 'Blog' &&
             <TextField
             fullWidth
             id="otherURL"
             label="Other URL"
             name="otherURL"
             autoComplete="otherURL"
            
         />
        }
        </Grid>
       
       
    </Grid>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Publish 
    </Button>

</Box>
}

export default NewBlogPost;