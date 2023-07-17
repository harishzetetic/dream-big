import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const LogoutConfirm = ({confirmLogout, setConfirmLogout})=>{
    const navigate = useNavigate()
    const {setAccount}  = useContext(AccountContext);
    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        setAccount(null);
        setConfirmLogout(false);
        navigate('/login')

    }


    return <Dialog
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
}

export default LogoutConfirm