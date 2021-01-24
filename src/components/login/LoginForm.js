import React, {useEffect, useState} from "react";
import axios from 'axios'
//import {getApi,getToken} from '../Utils/Common'

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

//import React from "react";
import { Link, Redirect } from 'react-router-dom';
import logo2 from "../../images/logo2.png"
import basij from "../../images/basij.jpg"
//import axios from "axios";
import { setUserSession, getApi} from '../Utils/Common';

import FloatingLabel from 'react-styled-floating-label';
import Card from 'react-bootstrap/Card'

//import Spinner from 'react-bootstrap/Spinner'
//import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button'
//import Toast from 'react-bootstrap/Toast'

export default function LoginForm(props){
  const [input , setInput] = useState({
    userName : "",
    password : "",
});
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [errorShow, setErrorShow] = useState(false);
const [redirect, setRedirect] = useState(false);
const [labelShowU, setLableShowU] = useState(false);
const [labelShowP, setLableShowP] = useState(false);


let validate = ()=>{
  let errors = [];
  let isValid = true;

  if (input.userName === "") {
    isValid = false;
    setIsError(true);
    errors += "شماره دانشجویی خود را وارد کنید\n";
  }    
  if (input.password === "") {
    isValid = false;
    setIsError(true);
    errors += "رمز عبور را وارد کنید\n";
  }


  setError(errors)
  
  
  return isValid;

}
let handleSubmit = (event)=>{

    event.preventDefault();
    console.log("error", error );
  console.log(input.userName , input.password);
  if(validate()){
    setIsLoading(true);
    setError(null);
    const url=getApi();
    axios.post(`${url}/api/auth/jwt/create/`,{
        student_code : input.userName,
        password : input.password,
    },
    {
      headers:{
        'Content-Type': 'application/json',}
    }
    ).then( response => {

    console.log(response.data);
    setUserSession(response.data.access,response.data.refresh);
  
    setIsLoading(false);
    setRedirect(true);
    
    console.log("error", error );

    }).catch((e) => {
      setError(e.response.data.detail);
      if(e.response.status === 401){
        setError("نام کاربری و یا رمز عبورتان نادرست است");
      }
      setIsError(true);
      //console.log(e.response.data.detail);
      // console.log(e);
      console.log(e.response);

      setIsLoading(false);
      
    });
  }
  
}

// let handleClose = ()=>{setForgotShow(false);}
// let handleShow = ()=>{setForgotShow(true);}
if(redirect) return <Redirect to='/dashboard'/>;
return(
  <div>
        <div className="row align-items-center min-vh-100 ">
        <div className="col-md-7 col-sm-10 col-lg-5 mx-auto my-auto">
        <Card className="text-center">
            <Card.Header className="bg-light text-center">
            <Row className=" px-auto">
              <Col xs={3} md={4} className="mx-auto ">
                <Image src={logo2} rounded fluid/>
              </Col>
              {/* <Col xs={3} md={2} className="mx-auto mr-0">
                <Image src={basij} rounded fluid/>
              </Col> */}

              
              {/* <Col xs={5} md={5} >
                <p className=" text-info font-weight-bold ">
                  <br/><br/>
                سامانه اردوها ی دانشگاه شهید رجایی
                </p>
              </Col> */}

            </Row>
               
            <p className=" text-info font-weight-bold ">
                  <br/>
                سامانه اردوهای دانشگاه شهید رجایی
                </p>
           
              </Card.Header>
            <Card.Body>
                <Card.Title >
                    {/* <div className="m=auto px-5 mx-5 max-vh-50 md:my-5 md:px-5">
                      <img className="card-img-top " src={logo} alt="university logo" />                
                    </div> */}
                </Card.Title>
                <Card.Text>
                <form className=""  to="/dashboard" method="POST" onSubmit={handleSubmit} >
                        <label variant="danger" className="texts text-danger pb-3">
                          {isError ? error 
                          :null }
                        </label>


                          <div className="form-group rounded-lg shadow-top-sm">
                            {labelShowU && <label >شماره ی دانشجویی:</label>}
                          <input 
                              aria-label="userName" 
                              name="userName" 
                              type="text" 
                              // required 
                              className="form-control border"
                              placeholder="شماره ی دانشجویی"
                              onChange={(e) => {setInput({...input, userName : e.target.value})}}
                              
                          />
                          {/* <p className="text-danger"> {isError ? error["userName"]:null } </p> */}
                          </div>

                          <div className="form-group rounded-lg shadow-top-sm" >
                            {labelShowP && <label>رمزعبور:</label> }
                          <input 
                              aria-label="password" 
                              name="password" 
                              type="password" 
                              // required 
                              className="form-control align-left"
                              placeholder="رمز عبور"
                              onChange={(e) => {setInput({...input, password : e.target.value}); }}
                             
                              />
                              {/* <p className="text-danger"> {isError ?error["password"]:null} </p> */}
                          </div>
                          
                         
                           
                         
                          
                          <Button
                                    type="submit"
                                    varient="primary"
                                    className=" d-block mx-auto my-3 px-5 mt-4"
                                    
                                    >
                                    
                                    {isLoading ? <Spinner animation="border" variant="primary" /> : 'ورود به حساب کاربری'}
                          </Button>
                          
                          <div className="form-group">
                            <Link className="text-info" variant="light" to="/forgotPassword">
                              رمزعبور خود را فراموش کرده اید؟
                            </Link>
                          </div>
                          {/* {forgotShow &&
                              <ForgotPassword
                              show={forgotShow}
                              onHide={handleClose}
                            />
                            
                            } */}
                  </form>
                  
                </Card.Text>
                
            </Card.Body>
            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card> 
            
            
    </div></div></div>

);


}
