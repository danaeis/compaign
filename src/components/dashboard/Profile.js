import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'
import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import { Button } from "bootstrap";


import ChangePassword from '../login/ChangePassword'

export default function Profile({ fixed }) {
  const [userName, setUserName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studyField, setStudyField] = useState('');
  const [email, setEmail] = useState(' ');
  const [account, setAccount] = useState(' ');


  const [modalShow, setModalShow] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isResponced, setIsResponced] = useState(false);
 
  let content = null;
  const url=getApi();

  useEffect(()=>{
    axios.get(`${url}/api/identity/user_info/`,
      {
        headers:{
          'authorization': `JWT ${getToken()}`
        }
      })
      .then((res)=> {
        setUserName(`${res.data.first_name} ${res.data.last_name}`);
        setStudentCode(`${res.data.student_code}`);
        setPhoneNumber(`${res.data.mobile_phone_number}`);
        setStudyField(`${res.data.field_of_study}`);

        setIsAuthorized(true);
        setIsResponced(true);
        //console.log(userName);
      })
      .catch((error) => {
        setIsResponced(true);
        // setUserName()
        console.log("error:",error);
      })
  },[url])
  

  let handleModal = () => {
    console.log("on click")
    setModalShow(true); 
  } 


  if(isResponced){
    if(isAuthorized){
      content = 
        
            <div className="relative col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
              <div className="card text-center border-0 shadow z-depth-2 rounded">
                <Card>
                    <Card.Body>
                      <Card.Title className="h5 text-primary text-right"><small className="text-primary">دانشجو:</small> {userName} </Card.Title>
                      <Card.Text>
                      <small>شماره دانشجویی:  </small>{studentCode} <br></br>
                      <small>شماره تلفن:  </small>{phoneNumber} <br></br>
                      <small>ایمیل:  </small>{email} <br></br>
                      <small>شماره حساب:  </small>{account} <br></br>

                     
                      <Card.Link>
                      <div>
                        <Button className="mx-0" onClick={() => { handleModal()}}>تغییر رمز عبور</Button>
                        { modalShow &&
                          <ChangePassword
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />  
                        
                        }
                        <Button className="mx-0" >بروز رسانی پروفایل</Button>

                      </div>
                        
                      </Card.Link>
                      </Card.Text>
                      
                    </Card.Body>
                </Card>

              </div></div>


    }
    else{
      content = 
        <Card>
            <Card.Body>
                <Card.Text>
                    جلسه ی کاری شما به اتمام رسیده است . .
                </Card.Text>
                <Button href="/login">
                    ورود
                </Button>
            </Card.Body>
        </Card>
    }
  }
  else{
    content = 
      <Card>
          <Card.Body>
              <Card.Text>
              در انتظار سرور . .
              </Card.Text>
          </Card.Body>
      </Card>
      
    
  }

  

  return (
    <div >
      {content}
    </div>
  )
}