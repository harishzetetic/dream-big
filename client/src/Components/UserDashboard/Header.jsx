import * as React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';

import { useContext, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
function Header() {
    const {account, setAccount}  = useContext(AccountContext);
    const [confirmLogout, setConfirmLogout] = useState(false);
   
    
    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        setAccount(null)
    }
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Avatar alt="Remy Sharp" src={account.picture} /> &nbsp;&nbsp;
      <Typography
          component="h2"
          variant="h5"
        >
          {account.name}
        </Typography>
        <Typography
          component="h2"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Dream Big
        </Typography>
    
        <Button variant="contained" size="small" onClick={()=>setConfirmLogout(true)}>
          <PersonRemoveIcon />&nbsp;&nbsp;Logout
        </Button>
      </Toolbar>
      <Dialog
        open={confirmLogout}
        onClose={()=>{setConfirmLogout(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {"We wanna see you again with Dream Big. Are you still want to logout?"}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setConfirmLogout(false)}} variant='outlined'>Cancel</Button>
          <Button onClick={logoutHandler} autoFocus variant='contained'>
            Logout me
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

/*
    Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

*/


export default Header;