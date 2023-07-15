
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './Context/AccountProvider';
import DreamBig from './Components/DreamBig';

function App() {
  
  const clientId = '206025614448-mrmf06f6fbuc11dq8no2jkqghjgr7uvp.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <AccountProvider>
      <DreamBig />
    </AccountProvider>
    
   </GoogleOAuthProvider>
  );
}

export default App;
