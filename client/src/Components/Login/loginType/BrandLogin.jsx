import Avatar from '@mui/material/Avatar';
import background from '../../../resouces/background.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import BrandSignUp from '../../Forms/BrandSignUp';
import Copyright from '../../Common/Copyright';
import BrandLoginForm from '../../Forms/BrandLoginForm';

const defaultTheme = createTheme();

export default function BrandLogin() {
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
                        <BrandSignUp />
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
                        {/**/}
                        <BrandLoginForm/>
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
            <Copyright withLoginLinks={true}/>
        </Container>
    </Box>
</Box>
}