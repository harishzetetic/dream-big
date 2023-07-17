import Login from "./Login/Login";
import UserDashboard from "./Pages/UserDashboard";
import PageNotFound from "./Pages/PageNotFound";
import { Route, Routes } from "react-router";
import InfluencerLogin from "./Login/loginType/InfluencerLogin";
import InfluencerDashboard from "./Pages/InfluencerDashboard";
import BrandLogin from "./Login/loginType/BrandLogin";
import BrandDashboard from "./Pages/BrandDashboard";
const DreamBig = () => {
    return <>
        <Routes>
            <Route exact path="/" element={<UserDashboard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/influencer-login" element={<InfluencerLogin/>} />
            <Route path="/brand-login" element={<BrandLogin />} />
            <Route path="/brand-dashboard" element={<BrandDashboard/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/influencer-dashboard" element={<InfluencerDashboard/>} />
            <Route element={<PageNotFound/>} />
        </Routes>
        </>
    
   

}

export default DreamBig;