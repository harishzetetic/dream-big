import Header from "../UserDashboard/Header"
// import { useContext } from 'react';
// import { AccountContext } from "../../Context/AccountProvider";
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
    const navigate = useNavigate()
    // const { account } = useContext(AccountContext);
    const sessionValue = sessionStorage.getItem('user')
    if(!sessionValue){
        navigate('/login');
    } else {
        return <>
        <Header />
        <h1>This is the User Dashboard</h1>
    </>
    }
    
}


export default UserDashboard