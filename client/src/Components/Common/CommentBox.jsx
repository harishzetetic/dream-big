
import { Avatar, TextField, Fab, Grid, Rating, Link, styled, Typography, Button, CardContent, CardActions, Card, Box, Divider } from '@mui/material'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { deepPurple } from '@mui/material/colors';



const CommentSection=styled(Box)`
display:flex;
align-items:center;
align-content: space-between;

`


const CommentDivider = styled(Divider)`
margin: 8px 0;
`



const CommentBox = ({comments, post}) => {
// const {name, picture, comment, }
return <Accordion>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
  <Typography>Post a Comment</Typography>
</AccordionSummary>
<AccordionDetails>
    <WriteComment/>
    
    <IndividualComment />
    <IndividualComment />
    <IndividualComment />
    <IndividualComment />
    <IndividualComment />

</AccordionDetails>
</Accordion>


}

export default CommentBox;


const IndividualComment = () => {
    return <><CommentSection>
    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    &nbsp; &nbsp;
    I did not like your post any more, this brand is so useless, I purchased it but feel no worthy at this cost. I am disliking it for this reason.
    </CommentSection><CommentDivider/></>
}

const WriteComment = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            comment: data.get('comment'),
            picture: '',
            name: ''
        }
        // need to fire the comment api here
    }
    return <><CommentSection component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    &nbsp; &nbsp;
    <TextField
        id="comment"
        required
        fullWidth  
        label="Please write your comment..."
        name="comment"          
/> 
    </CommentSection><CommentDivider/></>
}