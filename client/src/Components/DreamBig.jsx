import Login from "./Login/Login";
import UserDashboard from "./Pages/UserDashboard";
import PageNotFound from "./Pages/PageNotFound";
import { Route, Routes } from "react-router";
import InfluencerLogin from "./Login/loginType/InfluencerLogin";
import InfluencerDashboard from "./Pages/InfluencerDashboard";
import BrandLogin from "./Login/loginType/BrandLogin";
import BrandDashboard from "./Pages/BrandDashboard";
import 'react-notifications/lib/notifications.css';
import './style.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ViewPost from "./Pages/ViewPost";



const DreamBig = () => {
    return <>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/influencer-login" element={<InfluencerLogin/>} />
            <Route path="/brand-login" element={<BrandLogin />} />
            <Route path="/brand-dashboard" element={<BrandDashboard/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/influencer-dashboard" element={<InfluencerDashboard/>} />
            <Route path="/user-dashboard/:postId/:assignedCampaignId/:userId" element={<ViewPost />} />
            <Route element={<PageNotFound/>} />
        </Routes>
        <NotificationContainer/>
        </>
    
   

}

export default DreamBig;