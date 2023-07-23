import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../BrandDashboard/Title';
import { styled, Box } from '@mui/material';


function preventDefault(event) {
  event.preventDefault();
}


const Container = styled(Box)`
display:block;
min-width:21%;
margin-bottom:20px;
text-align:center;
border: 1px solid gray;
border-radius: 5px;
margin-left:10px;
margin-right:10px;
padding: 10px;
`
export default function Statics({title, value, emoji}) {
  return (
    <Container>
        <Title>{title} {emoji}</Title>
      <Typography component="p" variant="h4">
       {value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        
      </Typography>
      <div>
        
      </div>
    </Container>
  );
}