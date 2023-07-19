
import CampaignCard from "../Common/CampaignCard"
import {useEffect, useState} from 'react';
import { getAllActiveCampaign } from "../../Services/brandsApi";
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

const AllActiveCampaign = ({brandId}) => {
    const [activeCampaign, setActiveCampaign] = useState([])
    useEffect(()=>{
      const getActiveCampaigns = async () => {
        const result = await getAllActiveCampaign(brandId)  
        console.log(result)
        if(result?.status === 200){
            setActiveCampaign(result.data)
          }
      } 
      getActiveCampaigns();
    }, [])
    return <>
    {activeCampaign.map(item => {
        return <div key={item._id}>
            <CampaignCard campaign={item}/>
            <br/>
        </div>
    })}

{!activeCampaign.length && <>
      <NoRecordBox>
      <NoRecordTypo>There are currently no any active campaign</NoRecordTypo>
      </NoRecordBox>
    </>}

    </>
}

export default AllActiveCampaign