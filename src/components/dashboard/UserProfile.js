import Axios from 'axios';
import React, { useState } from 'react';
import { getToken, removeUserSession } from '../Utils/Common';
import axios from 'axios'
import Header from './Header'
import Profile from './Profile'
import {getApi,getAccessToken} from '../Utils/Common'

function UserProfile(props) {
  
 
  return (
    <div>
      <Header></Header>
      <Profile></Profile>
      <br/>
    </div>
  );
}
 
export default UserProfile;