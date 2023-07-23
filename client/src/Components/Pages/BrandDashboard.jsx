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
import Deposits from '../BrandDashboard/Deposit';
import Orders from '../BrandDashboard/Orders';
import ListSubheader from '@mui/material/ListSubheader';
import LogoutConfirm from '../Common/LogoutConfirm';
import {useState, useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import NewCampaign from '../Forms/NewCampaign';
import ActiveCampaign from '../BrandDashboard/ActiveCampaign';
import FailedCampaign from '../BrandDashboard/FailedCampaign';
import logo from '../../resouces/brand.png'
import SideListItem from '../Common/SideListItem';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Followers from '../BrandDashboard/Followers';
import Profile from '../BrandDashboard/Profile';
import { getBrandStatics } from '../../Services/brandsApi';


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
    const sessionValue = JSON.parse(sessionStorage.getItem('user'));
    const [statics, setStatics]=useState()

    useEffect(()=>{
        const getStatics = async()=>{
          const result = await getBrandStatics({id: sessionValue._id, name:sessionValue.brandName})
          if(result?.status === 200){
            setStatics(result.data)
          }
        }
        getStatics();
    }, []);
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
        if(statics)
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

            <SideListItem text="New Campaign" onClickCallback={() => { setCurrentTab('newcampaign') }} IconComponent={AddIcon} isButton={true} isActive={currentTab === 'newcampaign'}/>
            <SideListItem text="Dashboard" onClickCallback={() => { setCurrentTab('dashboard') }} IconComponent={SpaceDashboardIcon} isActive={currentTab === 'dashboard'}/>
            <SideListItem text="Active Campaigns" onClickCallback={() => { setCurrentTab('active-campaign') }} IconComponent={CampaignIcon} isActive={currentTab === 'active-campaign'}/>
            <SideListItem text="Failed Campaigns" onClickCallback={() => { setCurrentTab('failed-campaign') }} IconComponent={CampaignOutlinedIcon} isActive={currentTab === 'failed-campaign'}/>
            <SideListItem text="Influencers" onClickCallback={() => { setCurrentTab('followers') }} IconComponent={FollowTheSignsOutlinedIcon} isActive={currentTab === 'followers'}/>
            <SideListItem text="Profile" onClickCallback={() => { setCurrentTab('profile') }} IconComponent={AccountCircleOutlinedIcon} isActive={currentTab === 'profile'}/>
            <SideListItem text="Logout" onClickCallback={() => { setConfirmLogout(true) }} IconComponent={AddIcon} isButton={true}/>



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
             <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits title={'Total Campaign'} value={statics.totalCampaign}/>
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
                  <Deposits  title={'Total Posts'} value={statics.totalPosts}/>
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
                  <Deposits  title={'Total Sales'} value={statics.totalSales} />
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
                  <Deposits  title={'Total Query'} value={statics.totalQuery}/>
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
               {currentTab === 'followers' &&
               <Followers/>
              }

{currentTab === 'profile' &&
            <Profile />
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