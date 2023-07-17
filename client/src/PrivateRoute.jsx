 
 import { Route, Navigate } from "react-router"
 function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Navigate to={{pathname: '/login'}} />}
      />
    )
  }

  export default PrivateRoute