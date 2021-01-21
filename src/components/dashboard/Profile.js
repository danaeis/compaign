import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'
import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import { Button } from "bootstrap";


import ChangePassword from '../login/ChangePassword'
import UpdateProfile from './UpdateProfile'
import { Col,Row } from "react-bootstrap";
export default function Profile({ fixed }) {


  
  const [error, setError] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const [userName, setUserName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studyField, setStudyField] = useState('');
  const [email, setEmail] = useState(' ');
  const [account, setAccount] = useState(' ');


  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isResponced, setIsResponced] = useState(false);
 
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
 


  let content = null;
 

  
      content = 
        
            <div className="relative col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
              <div className="card text-center border-0 shadow z-depth-2 rounded">
                <Card>
                    <Card.Body>
                      
                      <Card.Text>
                        <Row>
                      <Col>
                      <UpdateProfile/>
                      </Col>
                      
                      
                      <Col>
                      <ChangePassword/>
                      </Col>
                      
                      </Row>
                      
                      
                      </Card.Text>
                      
                    </Card.Body>
                </Card>

              </div></div>


    
  //   else{
  //     content = 
  //       <Card>
  //           <Card.Body>
  //               <Card.Text>
  //                   جلسه ی کاری شما به اتمام رسیده است . .
  //               </Card.Text>
  //               <Button href="/login">
  //                   ورود
  //               </Button>
  //           </Card.Body>
  //       </Card>
  //   }
  // }
  // else{
  //   content = 
  //     <Card>
  //         <Card.Body>
  //             <Card.Text>
  //             در انتظار سرور . .
  //             </Card.Text>
  //         </Card.Body>
  //     </Card>
      
    
  // }

  

  return (
    <div >
      {content}
    </div>
  )
}