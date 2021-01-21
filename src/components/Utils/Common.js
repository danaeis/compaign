import axios from 'axios';
import { Redirect } from 'react-router-dom';
//import xtype from 'xtypejs';

export const getApi = () =>{
  return 'http://95.156.252.188:8000';
}


// let time;

// let startDateTime = new Date('December 21, 2019 03:24:00');



// set the token and user from the session storage
export const setUserSession = (token,refresh) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('refresh', refresh);
  sessionStorage.setItem('loginStart', Date());
  sessionStorage.setItem('refreshStart', Date());
  sessionStorage.setItem('loggedIn',true);
}

export const getUser=()=>{
  //if(sessionStorage.getItem('loggedIn')===true) sessionStorage.setItem('loggedIn',false);
  return sessionStorage.getItem('loggedIn')||false;
}
// return the token from the session storage
export const getToken = () => {
  const url=getApi();
  const currentDateTime = new Date();
  const startDateTime = new Date(sessionStorage.getItem('loginStart'));
  const lastRefreshDateTime = new Date(sessionStorage.getItem('refreshStart'));
  //console.log("now: " + currentDateTime + " passed from " + lastRefreshDateTime + " : " + Math.round((currentDateTime - lastRefreshDateTime)/(1000*60)));
  

  if(Math.round((currentDateTime - startDateTime)/(1000*60*60*24)) >= 7){
    Redirect('/login');
  }
  if(Math.round((currentDateTime - lastRefreshDateTime)/(1000*60)) >= 30){
    // console.log(sessionStorage.getItem('refresh'));
    axios.post(`${url}/api/auth/jwt/refresh/`,
    {
        "refresh" : sessionStorage.getItem('refresh')
    
    })
    .then((response)=>{
      //console.log(response.data.access);
      sessionStorage.setItem('token', response.data.access);
      sessionStorage.setItem('loginStart',Date());
    })
    //console.log("refreshing");
  }
  //  else{
  //   console.log("access allowed");
  //  }
  return sessionStorage.getItem('token') || null;
}

// // remove the token and user from the session storage
export const removeUserSession = () => {
  //console.log("logout");
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refresh');
  sessionStorage.removeItem('loginStart');
  sessionStorage.removeItem('refreshStart');

  // sessionStorage.removeItem('user');
}

