import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
} from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from 'axios';
import LoginForm from './components/login/LoginForm'
import ChangePassword from './components/login/ChangePassword'
import UserDashboard from './components/dashboard/UserDashboard.js'
import UserProfile from './components/dashboard/UserProfile.js'


import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';
import { getUser, removeUserSession, setUserSession } from './components/Utils/Common';
import ResetPassword from './components/login/ResetPassword';
import ForgotPassword from './components/login/ForgotPassword';

 

function App() {
  // const [authLoading, setAuthLoading] = useState(true);
 
  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }
 
  //   axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
  //     setUserSession(response.data.token, response.data.user);
  //     setAuthLoading(false);
  //   }).catch(error => {
  //     removeUserSession();
  //     setAuthLoading(false);
  //   });
  // }, []);
 
  // if (authLoading && getToken()) {
  //   return <div className="content">Checking Authentication...</div>
  // }
 


  return (
    <div className="container-fluid">
      
      <Router>
        <Switch>
          <PublicRoute restricted={true} component={LoginForm} path="/login" exact />
          <PublicRoute restricted={true} component={ResetPassword} path="/password/reset/confirm/:uid/:token"></PublicRoute>
          
          <PublicRoute component={ForgotPassword} path="/forgotPassword" exact/>
          
          <PrivateRoute component={UserDashboard} path="/dashboard" exact/>
          <PrivateRoute component={UserProfile} path="/dashboard/profile/" exact/>
          <PrivateRoute component={ChangePassword} path="/dashboard/profile/ChangePassword" exact/>

        </Switch>
    </Router>
    </div>
  );
}

export default App;
