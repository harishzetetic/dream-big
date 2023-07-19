

import {Box, styled} from '@mui/material';

const Title=styled(Box)`
  font-size: 34px;
  width:100%;
  padding-left:20px;
  border-left: 8px solid #1976d2;
  margin-bottom:15px;
` 
const PageTitle = ({title})=>{
    return <Title>{title}</Title>
}

export default PageTitle