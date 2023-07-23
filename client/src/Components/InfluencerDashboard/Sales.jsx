import { Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, Avatar} from '@mui/material';
import {useEffect, useState} from 'react'
import { getStaticsByInfluencerId } from "../../Services/influencersApi";



function createData(image, name, phone, email, interestedIn) {
    return { image, name, phone, email, interestedIn };
  }
  




const Sales = () => {
    const [rows, setRows] = useState([])
    const sessionValue= JSON.parse(sessionStorage.getItem('user'))
    useEffect(()=>{
        const getStatics = async()=>{
            const result = await getStaticsByInfluencerId({id: sessionValue._id});
            if(result?.status === 200){
              const purchaseData = result.data.filter(item => item.purchase)
                setRows(purchaseData)
            }
        }
        getStatics();
    }, [])
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell></TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Interested In&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.image}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <Avatar alt={row.userName} src={row.userPicture} />

                  </TableCell>
                  <TableCell align="right">{row.userName}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.userEmail}</TableCell>
                  <TableCell align="right">{row.modewName}</TableCell>
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Sales