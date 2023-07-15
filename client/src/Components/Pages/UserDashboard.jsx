import Header from "../UserDashboard/Header"
import { useContext, useEffect } from 'react';
import { AccountContext } from "../../Context/AccountProvider";
const UserDashboard = () => {
    const {setAccount}  = useContext(AccountContext);
    useEffect(()=>{
        const sessionValue = JSON.parse(sessionStorage.getItem('user'));
        if(!sessionValue){
            setAccount(null)
        }
        // uUDH4lJ8543XOhGF
    })
return <>
<Header/>
<h1>This is the User Dashboard</h1>
</>
}


export default UserDashboard