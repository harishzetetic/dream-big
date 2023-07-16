// React Imports
import * as React from 'react';

// Components Import
import CssBaseline from '@mui/material/CssBaseline';
import Wallpaper from '../../resouces/wallpaper.png';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Other Imports
import UserLogin from './loginType/UserLogin';
const defaultTheme = createTheme();



export default function Login() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Wallpaper})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      <UserLogin/>
      </Grid>
    </ThemeProvider>
  );
}

