
import { Avatar, TextField, styled, Typography, Box, Divider, Button } from '@mui/material'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { deepPurple } from '@mui/material/colors';
import {useState} from 'react';
import { postComment } from '../../Services/userApi';

import {NotificationManager} from 'react-notifications';


const CommentSection=styled(Box)`
display:flex;
align-items:center;
align-content: space-between;
& button{
    width:30px;
    padding: 15px 0;
    margin-left: 10px;
}
`


const CommentDivider = styled(Divider)`
margin: 8px 0;
`



const CommentBox = (props) => {

const [comments, setComments] = useState(props.comments)
return <Accordion>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
  <Typography>Post a Comment</Typography>
</AccordionSummary>
<AccordionDetails>
    <WriteComment post={props.post} setComments={setComments} />
    {comments && comments.map((item, index) => (<IndividualComment key={index} item={item}/>))}

</AccordionDetails>
</Accordion>


}

export default CommentBox;


const IndividualComment = ({item}) => {
    return <><CommentSection>
   <Avatar alt={item.userName} src={item.picture} />
    &nbsp; <strong>{item.userName}</strong>
    &nbsp; &nbsp;
    {item.comment}
    </CommentSection><CommentDivider/></>
}

 const WriteComment = ({post, setComments}) => {
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            comment: data.get('comment'),
            picture: sessionValue.picture,
            userName: sessionValue.name,
            userId: sessionValue.sub,
            postId: post._id
            
        }
        const result = await postComment(dataSetForApi);
        if(result?.status === 200){
            setComments(result.data.comments)
            NotificationManager.success('Success', 'Your comment has been added');
        } else {
            NotificationManager.error('Error', 'Error while commenting this post');

        }
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
<Button
        type="submit"
        fullWidth
        variant="contained"
        size='large'
       
    >
        Post
    </Button>
    </CommentSection><CommentDivider/></>
}