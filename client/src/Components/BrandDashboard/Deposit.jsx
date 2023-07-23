import * as React from 'react';
import Link from '@mui/material/Link';
import {Typography, styled} from '@mui/material';
import Title from './Title';



const Value = styled(Typography)`
font-size:72px;
text-align:center;
padding-top: 15px;
font-weight:900;
`

export default function Deposits({title, value}) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Value component="p" variant="h4">
        {value}
      </Value>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        
      </Typography>
      <div>
        
      </div>
    </React.Fragment>
  );
}