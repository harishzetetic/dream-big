import { Box, Grid, TextField, Button, MenuItem, Snackbar, Alert } from "@mui/material"
import { useState } from "react";
import { states } from "../../constants";
import { signUpInfluencer } from "../../Services/influencersApi";


const InfluencerSignUp = () => {
    const INITIAL_RESPONSE = { show: false, message: '', type: 'success'}
    const [apiResponse, setApiResponse] = useState(INITIAL_RESPONSE)
    const [validation, setValidation] = useState({
            firstName : '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            email: '',
            password: '', 
    })
    const [isFormValid, setIsFormValid] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            firstName : data.get('firstName'),
            lastName: data.get('lastName'),
            addressLine1: data.get('addressLine1'),
            addressLine2: data.get('addressLine2'),
            city: data.get('city'),
            state: data.get('state'),
            email: data.get('email'),
            password: data.get('password'),
            subscribedCampaigns:[],
            activeCampaigns:[],
            successCampaigns:[],
            failedCampaigns:[],
            subscribers:[],
            rating:1,
            facebookURL:'',
            instagramURL:'',
            youtubeURL:'',
            appreciations: 0,
            rewards: 0,
            saleUnit:0,
            role:'dreambig.influencer'
        }
        if(dataSetForApi.state === 'None'){
            setApiResponse({
                show: true,
                message: 'State value must be provided',
                type: 'error'
            })
            return;
        }
        const result = await signUpInfluencer(dataSetForApi)
        if(result.status === 200){
            if(result.data.msg){
                setApiResponse({
                    show: true,
                    message: result.data.msg,
                    type: 'success'
                })
            } else if(result.data._id){
                setApiResponse({
                    show: true,
                    message: 'Congratulations! You are now registered as Influencer with Dream Big. Kindly Login for proceed',
                    type: 'success'
                })
            } else {
                setApiResponse({
                    show: true,
                    message: 'Seems to be an error while registering your details',
                    type: 'error'
                })  
            }

        }
    };

    const validate = (field, value) => {
        if(field === 'firstName'){
            if(value.length < 5){
                setValidation({...validation, firstName: 'First name should be at least with 5 characters'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, firstName: ''}) 
                setIsFormValid(true)
            }
        }
        if(field === 'lastName'){
            if(value.length < 5){
                setValidation({...validation, lastName: 'Last name should be at least with 5 characters'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, lastName: ''}) 
                setIsFormValid(true)

            }
        }
        if(field === 'addressLine1'){
            if(value.length < 5){
                setValidation({...validation, addressLine1: 'Address Line 1 should be at least with 5 characters'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, addressLine1: ''}) 
                setIsFormValid(true)

            }
        }
        if(field === 'addressLine2'){
            if(value.length < 5){
                setValidation({...validation, addressLine2: 'Address Line 2 should be at least with 5 characters'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, addressLine2: ''}) 
                setIsFormValid(true)

            }
        }
        if(field === 'state'){
            if(value === 'None'){
                setValidation({...validation, state: 'Please pick any state'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, state: ''}) 
                setIsFormValid(true)

            }
        }
        if(field === 'email'){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                setValidation({...validation, email: 'Email format is not correct'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, email: ''}) 
                setIsFormValid(true)

            }
        }
        if(field === 'password'){
            if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)){
                setValidation({...validation, password: 'Minimum eight characters, at least one letter and one number'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, password: ''}) 
                setIsFormValid(true)

            }
        }
    }
    return <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
    <Snackbar open={apiResponse.show} autoHideDuration={6000} onClose={()=>{setApiResponse(INITIAL_RESPONSE)}}>
        <Alert onClose={()=>setApiResponse(INITIAL_RESPONSE)} severity={apiResponse.type} sx={{ width: '100%' }}>
           {apiResponse.message}
        </Alert>
    </Snackbar>
        <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!!validation.firstName}
                helperText={validation.firstName}
                onChange={(e) => validate('firstName', e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={!!validation.lastName}
                helperText={validation.lastName}
                onChange={(e) => validate('lastName', e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                name="addressLine1"
                required
                fullWidth
                id="addressLine1"
                label="Address Line 1"
                autoFocus
                error={!!validation.addressLine1}
                helperText={validation.addressLine1}
                onChange={(e) => validate('addressLine1', e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="addressLine2"
                label="Address Line 2"
                name="addressLine2"
                error={!!validation.addressLine2}
                helperText={validation.addressLine2}
                onChange={(e) => validate('addressLine2', e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                name="city"
                required
                fullWidth
                id="city"
                label="City"
                autoFocus
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          required
          fullWidth
          select
          label="State"
          name="state"
          defaultValue="None"
          error={!!validation.state}
          helperText={validation.state}
          onChange={(e) => validate('state', e.target.value)}
          
        >        
          {states.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
        </TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!validation.email}
                helperText={validation.email}
                onChange={(e) => validate('email', e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!validation.password}
                helperText={validation.password}
                onChange={(e) => validate('password', e.target.value)}
            />
        </Grid>
        
    </Grid>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!isFormValid}
    >
        Sign Up
    </Button>

</Box>
}

export default InfluencerSignUp