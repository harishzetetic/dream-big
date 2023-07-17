import * as React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import LogoutConfirm from '../Common/LogoutConfirm';

function Header() {
    const [confirmLogout, setConfirmLogout] = useState(false);
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Avatar alt="Remy Sharp" src={sessionValue.picture} /> &nbsp;&nbsp;
      <Typography
          component="h2"
          variant="h5"
        >
          {sessionValue.name}
        </Typography>
        <Typography
          component="h2"
          variant="h2"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          DREAM BIG
        </Typography>
    
        <Button variant="contained" size="small" onClick={()=>setConfirmLogout(true)}>
          <PersonRemoveIcon />&nbsp;&nbsp;Logout
        </Button>
      </Toolbar>
      <LogoutConfirm confirmLogout={confirmLogout} setConfirmLogout={setConfirmLogout}/>
    </React.Fragment>
  );
}

export default Header;