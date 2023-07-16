import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom';
import background from '../../../resouces/background.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import InfluencerSignUp from '../../Forms/InfluencerSignUp';
import InfluencerLoginForm from '../../Forms/InfluencerLoginForm';

const defaultTheme = createTheme();

export default function InfluencerLogin() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '90vh', backgroundImage: `url(${background})`, backgroundPosition:'center' }}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <InfluencerSignUp />
                    </Box>
                </Container>
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <InfluencerLoginForm />
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    );
}


const Footer = () => {
    return <Box
    sx={{display: 'flex',flexDirection: 'column',}}>
    <Box component="footer" sx={{py: 3,px: 2,mt: 'auto', }} >
        <Container maxWidth="sm">
            <Copyright />
        </Container>
    </Box>
</Box>
}


function Copyright(props) {
    return (
        <>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        
            <Link to="/login">
                User Login
            </Link>{' '}
            |{' '}
            <Link to="/brand-login">
                Brand Login
            </Link>{' '}
    
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Dream Big
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        </>
        
    );
}