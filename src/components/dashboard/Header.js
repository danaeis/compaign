import React, {useEffect, useState, useRef} from "react";
import axios from 'axios'
import {getApi,getToken,removeUserSession} from '../Utils/Common'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
  

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="bg-light" variant="light">
      صفحه ی اصلی
    </Tooltip>
  );

  if(isResponced){
    if(isAuthorized){
      content = 
     
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mx-0 my-3 rounded" >
      {/* <Navbar.Brand href="/dashboard" className="h5" >سامانه ی اردوها</Navbar.Brand> */}
        {/* <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          className="bg-light" variant="light"
        > */}
          
          <Navbar.Brand href="/dashboard" className="h5 peach-gradient" >
            سامانه ی اردوها
          
          </Navbar.Brand>
          <small className="text-primary mx-3">
            {/* سعیده دانایی */}
            {userName}
            </small>
        {/* </OverlayTrigger> */}
      

      <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="primary"></Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard" className="d-none d-lg-block">صفحه ی اصلی</Nav.Link>
          <Nav.Link href="/dashboard/profile">   پروفایل</Nav.Link>
          <Nav.Link href="#" onClick={handleShow} >خروج</Nav.Link>
        </Nav>


        <Modal show={logoutShow} onHide={handleClose} >
          
          <Modal.Body className="text-right">میخواهید خارج شوید؟ 
          
          </Modal.Body>
          <Modal.Footer className="text-center" >
          <div className="form-group">
            
            <Link to="/login" variant="primary" onHover="shadow-lg" className="text-center" onClick={removeUserSession} >
              خروج
            </Link>
          </div>  
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
      <p className="text-danger">لطفا منتظر بمانید. .</p>
      <Spinner animation="border" variant="primary" />
      </Navbar>
      
    
  }

  

  return (
    <div >
      {content}
    </div>
  )
}