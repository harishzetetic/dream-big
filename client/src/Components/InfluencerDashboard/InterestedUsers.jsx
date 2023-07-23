import { Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper} from '@mui/material';




function createData(image, name, phone, email, interestedIn) {
    return { image, name, phone, email, interestedIn };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 25),
  ];

const InterestedUsers = () => {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>Image</TableCell>
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
                    {row.image}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.interestedIn}</TableCell>
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default InterestedUsers