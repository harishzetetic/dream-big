
import {useContext, useState} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../../Context/AccountProvider';
import { Link } from 'react-router-dom';
import Copyright from '../../Common/Copyright';

import { GoogleLogin } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import logo from '../../../resouces/logo.png'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Grid/Grid';
import { addUser } from '../../../Services/userApi';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert/Alert';


const TagLine = styled(Typography)`font-size:15px;`;
const Branding = styled(Typography)`margin-bottom: 0.10em;`;

const UserLogin = () => {
    const navigate = useNavigate()
    const { setAccount } = useContext(AccountContext);
    const [isLoginError, setIsLoginError] = useState(false)
    const onLoginSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        const userdata = {
          ...decoded,
          role: "dreambig.user",
          subsriptions: []
        }
    
        const result = await addUser(userdata);
        if(result.status === 200){
            setAccount(userdata);
            sessionStorage.setItem('user', JSON.stringify(userdata));
            setIsLoginError(false)
            navigate('/user-dashboard')
        } else {
            setIsLoginError(true)
        }
      }
    
      const onLoginError = (res) => {
        console.log('Login Failed')
      }
    return <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <Snackbar open={isLoginError} autoHideDuration={6000} onClose={()=>{}}>
        <Alert onClose={()=>{}} severity="error" sx={{ width: '100%' }}>
           There is a problem with login
        </Alert>
    </Snackbar>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={logo} alt="logo" style={{ height: '200px', width: '200px' }} />
      <Branding variant="h1" gutterBottom> Dream Big </Branding>
      <TagLine variant="h6" gutterBottom> A Digital Marketing App b/w Brands & Influencers. </TagLine>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={() => { }} sx={{ mt: 1 }}>

        <GoogleLogin theme='filled_blue' onSuccess={onLoginSuccess} onError={onLoginError} />

        <br />
        <Grid container>
          <Grid item xs>
            <Link to="/brand-login" >
              Brand Login
            </Link>
          </Grid>
          <Grid item>
            <Link to="/influencer-login" >
              {"Influencer Login"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  </Grid>
}

export default UserLogin;