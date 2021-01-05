import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken,removeUserSession} from '../Utils/Common'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'


export default function Header({ fixed }) {
  const [userName, setUserName] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isResponced, setIsResponced] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  const handleClose = () => setLogoutShow(false);
  const handleShow = () => setLogoutShow(true);

  let content = null;
  const url=getApi();

  useEffect(()=>{
    axios.get(`${url}/api/identity/user_info`,
      {
        headers:{
          'authorization': `JWT ${getToken()}`
        }
      })
      .then((res)=> {
        setUserName(`${res.data.first_name} ${res.data.last_name}`);
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
  
  if(isResponced){
    if(isAuthorized){
      content = 
     
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mx-0 my-3 rounded" >
      <Navbar.Brand href="/dashboard" className="h5">سامانه ی اردوها</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="primary"></Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" className="d-none d-lg-block">{userName}</Nav.Link>
          <Nav.Link href="/dashboard/profile"  >پروفایل</Nav.Link>
          <Nav.Link href="#" onClick={handleShow} >خروج</Nav.Link>
        </Nav>


        <Modal show={logoutShow} onHide={handleClose}>
          
          <Modal.Body>میخواهید خارج شوید؟ </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              لغو
            </Button>
            <Button variant="primary" onHover="shadow-lg" onClick={removeUserSession} href="/login">
              خروج
            </Button>
          </Modal.Footer>
        </Modal>

      </Navbar.Collapse>
      </Navbar>
      
   
    }
    else{
      content = 
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mx-0 my-3" >
      <Navbar.Brand href="#home">سامانه ی اردوها</Navbar.Brand>
      </Navbar>
    }
  }
  else{
    content = 
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mx-0 my-3" >
      <Navbar.Brand href="#home">سامانه ی اردوها</Navbar.Brand>
      <p className="text-danger">در انتظار سرور  . .</p>
      <Spinner animation="border" variant="primary" />
      </Navbar>
      
    
  }

  

  return (
    <div >
      {content}
    </div>
  )
}