import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


function Copyright(props) {
        return (
            <>
            {props.withLoginLinks && (
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
        
                <Link to="/login">
                    User Login
                </Link>{' '}
                |{' '}
                <Link to="/brand-login">
                    Brand Login
                </Link>{' '}|{' '}
                <Link to="/influencer-login">
                    Influencer Login
                </Link>{' '}
        
            </Typography>
            )}
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://rsystems.com/">
              Dream Big
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          </>
        );
      }


export default Copyright