import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import { useParams } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export default function ResetPassword(props) {
    const {id} = useParams();
    const {token} = useParams();
console.log(id , token);


}