
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './Context/AccountProvider';
import DreamBig from './Components/DreamBig';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  
  const clientId = '206025614448-mrmf06f6fbuc11dq8no2jkqghjgr7uvp.apps.googleusercontent.com';
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <GoogleOAuthProvider clientId={clientId}>
    <AccountProvider>
   

      <DreamBig />
      
    </AccountProvider>
   </GoogleOAuthProvider>
   </LocalizationProvider>
  );
}

export default App;
