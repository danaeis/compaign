import { BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from 'axios';
import LoginForm from './components/login/LoginForm'
import ChangePassword from './components/login/ChangePassword'
import UserDashboard from './components/dashboard/UserDashboard.js'
import UserProfile from './components/dashboard/UserProfile.js'


import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './components/Utils/Common';
import ResetPassword from './components/login/ResetPassword';

 

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
    <div className="container">
      <Router>
        <Switch>
          <PublicRoute path="/login">
            <LoginForm  />
          </PublicRoute>
          {/* <PublicRoute path='/password/reset/confirm/:id/:token'>
            <ResetPassword/>
          </PublicRoute> */}
          <PrivateRoute path="/ChangePassword">
            <ChangePassword />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard">
            <UserDashboard/>
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/profile">
            <UserProfile/>
          </PrivateRoute>
          <PrivateRoute path="/dashboard/profile/changePassword">
            <ChangePassword/>
          </PrivateRoute>
          <Route exact path="/">
            <LoginForm />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
