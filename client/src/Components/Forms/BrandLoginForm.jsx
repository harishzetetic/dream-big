import { TextField, Box, Button, Snackbar, Alert } from "@mui/material"
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from "../../Context/AccountProvider";
import { loginBrand } from "../../Services/brandsApi";

const BrandLoginForm = () => {
    const navigate = useNavigate()
    const { setAccount } = useContext(AccountContext);

    const INITIAL_RESPONSE = { show: false, message: '', type: 'success'}
    const [apiResponse, setApiResponse] = useState(INITIAL_RESPONSE)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await loginBrand({
            email: data.get('loginemail'),
            password: data.get('loginpassword'),
        })

        if(result?.status === 200){
            if(result.data.msg){
                setApiResponse({
                    show: true,
                    message: result.data.msg,
                    type: 'error'
                })
            } else if(result.data._id){
                setAccount(result.data);
                sessionStorage.setItem('user', JSON.stringify(result.data));
                navigate('/brand-dashboard')
            } else {
                setApiResponse({
                    show: true,
                    message: 'Seems to be an error while registering your details',
                    type: 'error'
                })  
            }
        } else {
            setApiResponse({
                show: true,
                message: 'Oops! Error occured',
                type: 'error'
            })
        }
    };

    return <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
         <Snackbar open={apiResponse.show} autoHideDuration={6000} onClose={()=>{setApiResponse(INITIAL_RESPONSE)}}>
        <Alert onClose={()=>setApiResponse(INITIAL_RESPONSE)} severity={apiResponse.type} sx={{ width: '100%' }}>
           {apiResponse.message}
        </Alert>
    </Snackbar>
    <TextField
        margin="normal"
        required
        fullWidth
        id="loginemail"
        label="Email Address"
        name="loginemail"
        autoComplete="loginemail"
        autoFocus
    />
    <TextField
        margin="normal"
        required
        fullWidth
        name="loginpassword"
        label="Password"
        type="password"
        id="loginpassword"
        autoComplete="loginpassword"
    />
    
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Sign In
    </Button>

</Box>
}

export default BrandLoginForm