import Axios from 'axios';
import React, { useState } from 'react';
import { getToken, removeUserSession } from '../Utils/Common';
import axios from 'axios'
import Header from './Header'
import Compaign from './Compaign'
import {getApi,getAccessToken} from '../Utils/Common'

function Dashboard(props) {
  
 
  return (
    <div className="min-vh-100">
      <Header></Header>
      <Compaign></Compaign>
      <br/>
    </div>
  );
}
 
export default Dashboard;