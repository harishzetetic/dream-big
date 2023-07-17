
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';
import {useState} from 'react';

import { MenuItem } from '@mui/material';
import { targetAudience, fuelType } from '../../constants';
import { createCampaign } from '../../Services/brandsApi';



const defaultTheme = createTheme();

const NewCampaign = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'))
    const INITIAL_RESPONSE = { show: false, message: '', type: 'success'}
    const [apiResponse, setApiResponse] = useState(INITIAL_RESPONSE)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataSetForApi = {
            title: data.get('title'),
            start: data.get('start'),
            end: data.get('end'),
            targetAudience: data.get('targetAudience'),
            rewards: data.get('rewards'),
            modelName: data.get('modelName'),
            modelId: data.get('modelId'),
            pricing: data.get('pricing'),
            fuelType: data.get('fuelType'),
            url: data.get('url'),
            objective:data.get('objective'),
            subscribers:[],
            likes:[],
            dislikes:[],
            comments:[],
            sales: 0,
            subscribersRating:0,
            createdBy:userData._id,
            createdDate:dayjs().format('YYYY-MM-DD'),
            status:true
        }
        const result = await createCampaign(dataSetForApi);
        if(result?.status === 200){
            if(result.data._id){
                setApiResponse({
                    show: true,
                    message: 'Great! You have created the campaign. Best of Luck.',
                    type: 'success'
                })
            }
        } else {
            setApiResponse({
                show: true,
                message: 'Oops! Error while creating campaign',
                type: 'error'
            })
        }
      };


    return<>
    <ThemeProvider theme={defaultTheme}>
    <Snackbar open={apiResponse.show} autoHideDuration={6000} onClose={()=>{setApiResponse(INITIAL_RESPONSE)}}>
        <Alert onClose={()=>setApiResponse(INITIAL_RESPONSE)} severity={apiResponse.type} sx={{ width: '100%' }}>
           {apiResponse.message}
        </Alert>
    </Snackbar>
      <Container component="main">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
         
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Campaign Title"
                  name="title"
                  autoComplete="title"
                />
              </Grid>
       
              <Grid item xs={3}>
              <TextField
              type="date" 
                required
                fullWidth
                id="start"
                label="Campaign Start"
                name="start"
                autoComplete="start"
                defaultValue={dayjs().format('YYYY-MM-DD')}
                inputProps={{
                    min: dayjs().format('YYYY-MM-DD')
                  }}
              />
              </Grid>
              <Grid item xs={3}>
              <TextField
                type="date"
               required
               fullWidth
               id="end"
               label="Campaign End"
               name="end"
               autoComplete="end"
               defaultValue={dayjs().add(365, 'day').format('YYYY-MM-DD')}
              />
              </Grid>
              <Grid item xs={3}>
              <TextField
                  fullWidth
                  select
                  id="targetAudience"
                  label="Target Audience"
                  name="targetAudience"
                  autoComplete="targetAudience"
                  
                  defaultValue={"Businessmen"}
                >
              {targetAudience.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
                </TextField>
                </Grid>
                <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="rewards"
                  label="Rewards/Unit"
                  id="rewards"
                  autoComplete="rewards"
                  
                />
                
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="modelName"
                  label="Model Name"
                  id="modelName"
                  autoComplete="modelName"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="modelId"
                  label="Model Id"
                  id="modelId"
                  autoComplete="modelId"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="pricing"
                  label="Pricing(Ex. Showroom)"
                  id="pricing"
                  autoComplete="pricing"
                />
              </Grid>
              <Grid item xs={3}>
              <TextField
                  fullWidth
                  select
                  id="fuelType"
                  label="Fuel Type"
                  name="fuelType"
                  autoComplete="fuelType"
                  
                  defaultValue={"Petrol"}
                >
              {fuelType.map((item) => {
             return <MenuItem key={item} value={item}>{item}</MenuItem>
          })}
                </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="url"
                  label="Official URL"
                  id="url"
                  autoComplete="url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="objective"
                  label="Objective"
                  id="objective"
                  autoComplete="objective"
                  multiline
                  rows={4}
                  
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Launch
            </Button>
           
          </Box>
        </Paper>
      </Container>
      
    </ThemeProvider>
    </>
}
export default NewCampaign