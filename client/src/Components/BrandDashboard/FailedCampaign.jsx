
import CampaignCard from "../Common/CampaignCard"
import {useEffect, useState} from 'react';
import { getFailedCampaign } from "../../Services/brandsApi";
import {Typography, Box, styled} from '@mui/material'


const NoRecordBox = styled(Box)`
display:flex;
min-height: 80vh;
align-items:center;
margin: auto;

`
const NoRecordTypo = styled(Typography)`
 color: #fff;
 background-color:black;
 padding: 8px;
`

const FailedCampaign = ({brandId}) => {
    const [failedCampaign, setFailedCampaign] = useState([])
    useEffect(()=>{
      const getFailedCampaigns = async () => {
        const result = await getFailedCampaign(brandId)  
        console.log(result)
        if(result?.status === 200){
            setFailedCampaign(result.data)
          }
      } 
      getFailedCampaigns();
    }, [])
    return <>
    {failedCampaign.map(item => {
        return <div key={item._id}>
            <CampaignCard campaign={item}/>
            <br/>
        </div>
    })}
    {!failedCampaign.length && <>
      <NoRecordBox>
      <NoRecordTypo>There are currently no any failed campaign</NoRecordTypo>
      </NoRecordBox>
    </>}
    </>
}

export default FailedCampaign