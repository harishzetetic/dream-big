
import {Box, Avatar, Typography, styled} from '@mui/material'

const Container = styled(Box)`

width:100%;
`
const First =styled(Box)`
width:20%;
`

const Second =styled(Box)`
width:80%;
text-align:right;
`
const Follower = styled(Box)`
display:flex;
align-items:center;
width:100%;
border: 2px solid #797979;
padding: 10px 20px;
border-radius: 5px;
margin-bottom: 10px;
`


const Followers = () => {
    return <>
        <Container>
            <Typography>Page under construction: Currently your are seeing demo data.</Typography>
        <Follower>
            
                    <First>
                        <Avatar></Avatar>
                        
                    </First>
                    <Second><Typography>Harish Sharma</Typography></Second>
                    </Follower>
            
            
            
            
        </Container>
    </>
}

export default Followers