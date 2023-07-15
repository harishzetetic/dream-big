import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Pages/UserDashboard";
import PageNotFound from "./Pages/PageNotFound";


const DreamBig = () => {
    // const {account}  = useContext(AccountContext);
    const userInfoFromSession = JSON.parse(sessionStorage.getItem('user'));
    if(userInfoFromSession){
        return <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserDashboard />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    } else {
        return <Login/>
    }
   

}

export default DreamBig;