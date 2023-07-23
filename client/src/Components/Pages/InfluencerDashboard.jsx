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
import Chart from '../InfluencerDashboard/Chart';
import Deposits from '../InfluencerDashboard/Deposit';
import Orders from '../InfluencerDashboard/Orders';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutConfirm from '../Common/LogoutConfirm';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import logo from '../../resouces/influencer.png'

import { useState, useEffect } from 'react';
import AllActiveCampaign from '../InfluencerDashboard/AllActiveCampaign';
import NewBlogPost from '../Forms/NewBlogPost';
import PageTitle from '../Common/PageTitle';
import SideListItem from '../Common/SideListItem';
import CampaignCard from '../Common/CampaignCard';
import PostCollection from '../Common/PostCollection';
import InterestedUsers from '../InfluencerDashboard/InterestedUsers';
import Sales from '../InfluencerDashboard/Sales';
import Followers from '../InfluencerDashboard/Followers';
import Profile from '../InfluencerDashboard/Profile';
import { getInfluencerStatics } from '../../Services/influencersApi';

const defaultTheme = createTheme();
const drawerWidth = 240;


const InfluencerDashboard = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate()
  const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  const [statics, setStatics] = useState();
  useEffect(()=>{
    const getStatics = async() => {
      const result = await getInfluencerStatics({id: sessionValue._id})
      if(result?.status === 200){
        setStatics(result.data)
      }
    }
    getStatics()
  }, [])
  useEffect(() => {
    if (sessionValue === null) {
      navigate('/login');
    } else if (sessionValue.role === "dreambig.influencer") {
      navigate('/influencer-dashboard');
    } else if (sessionValue.role === "dreambig.user") {
      navigate('/user-dashboard');
    } else if (sessionValue.role === "dreambig.brand") {
      navigate('/brand-dashboard');
    }
  }, []);
  const [currentTab, setCurrentTab] = useState('dashboard');

  //***************************************************************************************************** */

  // const sessionValue = JSON.parse(sessionStorage.getItem('user'))

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
              Influencer Dashboard
            </Typography>
         
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
            <IconButton onClick={toggleDrawer} style={{ visibility: 'hidden' }}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

            <SideListItem text="New Post" onClickCallback={() => { setCurrentTab('new-post') }} IconComponent={AddIcon} isButton={true} isActive={currentTab === 'new-post'} />
            <SideListItem text="Dashboard" onClickCallback={() => setCurrentTab('dashboard')} IconComponent={DashboardIcon} isActive={currentTab === 'dashboard'} />
            <SideListItem text="My Posts" onClickCallback={() => setCurrentTab('my-posts')} IconComponent={DashboardIcon} isActive={currentTab === 'my-posts'} />

            <SideListItem text="Active Campaigns" onClickCallback={() => setCurrentTab('active-campaign')} IconComponent={ShoppingCartIcon} isActive={currentTab === 'active-campaign'} />
            <SideListItem text="Interested Users" onClickCallback={() => setCurrentTab('interested-users')}  IconComponent={PeopleIcon} isActive={currentTab === 'interested-users'}/>
            <SideListItem text="Sales" onClickCallback={() => setCurrentTab('sales')}  IconComponent={PeopleIcon} isActive={currentTab === 'sales'}/>
            <SideListItem text="Followers" onClickCallback={() => {setCurrentTab('followers') }} IconComponent={BarChartIcon} isActive={currentTab === 'followers'}/>
            <SideListItem text="Profile" onClickCallback={() => { setCurrentTab('profile')}} IconComponent={LayersIcon} isActive={currentTab === 'profile'}/>
            <SideListItem text="Logout" onClickCallback={() => setConfirmLogout(true)} IconComponent={LayersIcon} isButton={true} />
            <ListSubheader component="div" inset>App Version: v1.0</ListSubheader>

          </List>
          <img src={logo} alt="logo" style={{ height: '200px', width: '200px', marginLeft: '10px' }} />
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
              {/* Chart */}
              {currentTab === 'dashboard' && <>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                   <Deposits title={'Queries Recieved'} value={statics?.interested || 0}/>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                   <Deposits title={'Total Sales'} value={statics?.purchased || 0}/>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                   <Deposits title={'Total Posts'} value={statics?.posts || 0} />
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
                    <Deposits title={'Joined Campaigns'} value={sessionValue.subscribedCampaigns.length}/>
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {/* Recent Orders */}
                    {/* Recent Orders */}
                    {/* Recent Orders */}
                    {/* Recent Orders */}
                    <Orders posts={statics?.topPosts}/>
                  </Paper>
                </Grid>
              </>}
              {currentTab === "active-campaign" && <>
                <AllActiveCampaign />
              </>}
              {currentTab === 'new-post' && <>
                <NewBlogPost /></>}

              {currentTab === 'my-posts' && <>
                    <PostCollection />
              </>}
              {currentTab === 'interested-users' && 
                <InterestedUsers />
              }
               {currentTab === 'sales' && 
                <Sales />
              }

            {currentTab === 'followers' && 
                <Followers />
              }

              {currentTab === 'profile' && 
                <Profile/>
              }





            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <LogoutConfirm confirmLogout={confirmLogout} setConfirmLogout={setConfirmLogout} />
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

export default InfluencerDashboard



