import { Box, Grid, TextField, Button, MenuItem, Snackbar, Alert, Typography, styled } from "@mui/material"
import { useState } from "react";
import { brands } from "../../constants";
import { signUpInfluencer } from "../../Services/influencersApi";
import { signUpBrand } from "../../Services/brandsApi";



const NoteText = styled(Typography)`
    font-size: 12px
`
const BrandSignUp = () => {
    const INITIAL_RESPONSE = { show: false, message: '', type: 'success'}
    const [apiResponse, setApiResponse] = useState(INITIAL_RESPONSE)
    const [validation, setValidation] = useState({
            brandName: '',
            firstName : '',
            lastName: '',
            email: '',
            password: '', 
    })
    const [isFormValid, setIsFormValid] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            brandName: data.get('brandName'),
            firstName : data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            totalCampaigns:[],
            activeCampaigns:[],
            closedCampaigns:[],
            role:'dreambig.brand'
        }
        if(dataSetForApi.brandName === 'None'){
            setApiResponse({
                show: true,
                message: 'State value must be provided',
                type: 'error'
            })
            return;
        }
        const result = await signUpBrand(dataSetForApi)
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
                    message: 'Congratulations! Your brand account has been created. Kindly Login for proceed',
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
        if(field === 'brandName'){
            if(value === "None"){
                setValidation({...validation, brandName: 'Brand name should be mandatory.'})
                setIsFormValid(false)
            } else {
                setValidation({...validation, brandName: ''}) 
                setIsFormValid(true)
            }
        }
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
    <Grid item xs={12} sm={12}>
        <TextField
          id="brandName"
          required
          fullWidth
          select
          label="Brand"
          name="brandName"
          defaultValue={brands[0]}
          error={!!validation.brandName}
          helperText={validation.brandName}
          onChange={(e) => validate('brandName', e.target.value)}
          
        >        
          {brands.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
        </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Managing First Name"
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
                label="Managing Last Name"
                name="lastName"
                autoComplete="family-name"
                error={!!validation.lastName}
                helperText={validation.lastName}
                onChange={(e) => validate('lastName', e.target.value)}
            />
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
             <NoteText>Only one account can be created per brand. Duplicate accounts would be rejected.</NoteText>
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

export default BrandSignUp