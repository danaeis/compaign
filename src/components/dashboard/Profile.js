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

  let content = null;
  
      content = 
        
            <div className="relative col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
              <div className="card text-center border-0 shadow z-depth-2 rounded">
                <Card>
                    <Card.Body>
                      
                      <Card.Text>

                        <Row className="mx-2">
                          <Col className="border-right ml-2">
                          <UpdateProfile/>
                          </Col>
                          
                          
                          <Col className="border-right ml-2">
                          <ChangePassword/>
                          </Col>
                      
                        </Row>
                      
                      
                      </Card.Text>
                      
                    </Card.Body>
                </Card>

              </div></div>


    

  return (
    <div >
      {content}
    </div>
  )
}