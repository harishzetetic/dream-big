import Login from "./Login/Login";
import UserDashboard from "./Pages/UserDashboard";
import PageNotFound from "./Pages/PageNotFound";
import { Route, Routes } from "react-router";
import InfluencerLogin from "./Login/loginType/InfluencerLogin";
import InfluencerDashboard from "./Pages/InfluencerDashboard";
const DreamBig = () => {
    return <>
        <Routes>
            <Route exact path="/" element={<UserDashboard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/influencer-dashboard" element={<InfluencerDashboard/>} />
            <Route path="/influencer-login" element={<InfluencerLogin/>} />
            <Route element={<PageNotFound/>} />
        </Routes>
        </>
    
   

}

export default DreamBig;