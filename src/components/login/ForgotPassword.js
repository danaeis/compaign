import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast'
import Image from 'react-bootstrap/Image'
import logo2 from "../../images/logo2.png"

import back from "../../images/back.png"

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";
import FloatingLabel from 'react-styled-floating-label';

export default function ForgotPassword(props) {
const [email, setEmail] = useState(null);

const [show, setShow] = useState(false);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isResponced, setIsResponced] = useState(false);

const url = getApi();
let handleSubmit = (event) => {
  event.preventDefault();
  setShow(true);
  console.log(email);
  setIsLoading(true);

  axios.post(`${url}/api/auth/users/reset_password/`,{
    "email" : email,
  },{
    'Content-Type': 'application/json',
  })
  .then((response)=>{
    console.log(response);
    //props.onHide();
    setIsLoading(false);
    setIsResponced(true);
  })
 
}



    let content = 
    <div className="row align-items-center min-vh-100 ">
    <div className="col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
    <Card className="text-center">
            <Card.Header className="bg-light text-center">
            <Row className=" px-auto">
              <Col xs={3} md={2} className="mx-auto mr-0">
                <Image src={logo2} rounded fluid/>
              </Col>

            </Row>
               
            <p className=" text-info font-weight-bold ">
                  <br/>
                سامانه اردوهای دانشگاه شهید رجایی
                </p>
           
              </Card.Header>
            <Card.Body>
                <div>
                <p className=" text-info ">
                    فراموشی رمز عبور
                </p>
                    <form className=""  method="POST" onSubmit={(e) => {handleSubmit(e);}}>
                            
                            <div className="form-group border rounded-lg shadow-top-sm" >
                            <FloatingLabel text="email">
                              <input 
                                  aria-label="email address "
                                  name="email"
                                  id="email" 
                                  type="email"
                                  
                                  onChange={(e) => {setEmail(e.target.value)}}
                                  required 
                                  className="form-control border-0"
                                  />
                            </FloatingLabel>
                            </div>
                            <Button
                                    type="submit"
                                    varient="primary"
                                    className=" d-block mx-auto "
                                    
                                    >
                                    
                                    {isLoading ? <Spinner animation="border" variant="primary" /> : ' بازیابی رمز عبور'}
                          </Button>


                          <div className="form-group pt-3">
                            <Link className="text-info " variant="light" to="/login">
                              بازگشت به صفحه ی ورود     <Image src={back} width="3%"/>
                            </Link>
                          </div>

                    </form>
                  </div>
        </Card.Body>
        
      </Card>
</div></div>

let result = null;
if(isResponced){
 
  result=
    <div className="fixed-bottom mx-4 my-4">
        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Header>
          <strong className="mr-auto text-primary text-right">سامانه اردوها</strong>
            <p></p>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />    
            <small></small>
          </Toast.Header>
          <Toast.Body>
           لینک تغییر رمزعبور به ایمیلتان ارسال خواهد شد;) 
          
          
          </Toast.Body>
        </Toast>
       
      </div> 
  
}


    return (
      <div>
         {content}
         {result}
      </div>
     
    );
  }