import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import deepPurple from '@mui/material/colors/deepPurple';
import Avatar from '@mui/material/Avatar/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../Common/Copyright';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import Chart from '../BrandDashboard/Chart';
import Deposits from '../BrandDashboard/Deposit';
import Orders from '../BrandDashboard/Orders';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutConfirm from '../Common/LogoutConfirm';
import { Button } from '@mui/material';
import {useState, useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import NewCampaign from '../Forms/NewCampaign';
import CampaignCard from '../Common/CampaignCard';
import ActiveCampaign from '../BrandDashboard/ActiveCampaign';
import FailedCampaign from '../BrandDashboard/FailedCampaign';
import logo from '../../resouces/brand.png'



const defaultTheme = createTheme();
const drawerWidth = 240;
const BrandDashboard = () => {
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [currentTab, setCurrentTab] = useState('dashboard');

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const navigate = useNavigate()
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    useEffect(() => {
      if(sessionValue === null){
        navigate('/login');
    }else if(sessionValue.role === "dreambig.influencer") {
        navigate('/influencer-dashboard');
    } else if(sessionValue.role === "dreambig.user"){
        navigate('/user-dashboard');
    }else if(sessionValue.role === "dreambig.brand"){
      navigate('/brand-dashboard');
  }
    }, []);


    
   
        return <>
       <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              align='center'
            >
              Brand Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Avatar sx={{ bgcolor: deepPurple[500] }}>{sessionValue.firstName[0]}{sessionValue.lastName[0]}</Avatar> &nbsp;
            <Typography>Welcome, {sessionValue.firstName}</Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <ListItemButton>
            
          <Button variant="contained" fullWidth onClick={()=>setCurrentTab('newcampaign')}><AddIcon /> &nbsp;New Campaign</Button>
    </ListItemButton>
          <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" onClick={()=>setCurrentTab('dashboard')}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Active Campaigns" onClick={()=>setCurrentTab('active-campaign')}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Failed Campaigns" onClick={()=>setCurrentTab('failed-campaign')}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Followers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" onClick={()=>setConfirmLogout(true)}/>
    </ListItemButton>
    <ListSubheader component="div" inset>
      App Version: v1.0
    </ListSubheader>
            
          </List>
          <img src={logo} alt="logo" style={{ height: '200px', width: '200px' , marginLeft:'10px'}} />

        </Drawer>







        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>







            <Grid container spacing={3}>
              









            {currentTab === 'dashboard' && 
            <>
             {/* Chart */}
             <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
           
            </>
            }
              {currentTab === 'newcampaign' && 
              <NewCampaign />
              }
              {currentTab === 'active-campaign' &&
              <ActiveCampaign brandId={sessionValue._id}/>
              
              }
               {currentTab === 'failed-campaign' &&
                <FailedCampaign brandId={sessionValue._id}/>
              }





             </Grid>
            <Copyright sx={{ pt: 4 }} />






          </Container>

        </Box>






      </Box>
      <LogoutConfirm confirmLogout={confirmLogout} setConfirmLogout={setConfirmLogout}/>
    </ThemeProvider>
    </>
    
    
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );


export default BrandDashboard