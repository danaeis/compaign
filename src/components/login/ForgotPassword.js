import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


export default function ForgotPassword(props) {
const [email, setEmail] = useState(null);

const url = getApi();
let handleSubmit = (event) => {

  axios.post(`${url}/api/auth/users/reset_password/`,{
    email : email,
  })
  .then((response)=>{
    console.log(response);
  })
 
}



    let content = 
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter text-right">
            فراموشی رمز عبور
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div>
                    <form className=""  method="POST" >
                            
                            <div className="form-group border rounded-lg shadow-top-sm" >
                            <input 
                                aria-label="email address "
                                name="email"
                                id="email" 
                                type="email"
                                placeholder="ایمیلی که باآن ثبت نام شده اید: "
                                onChange={(e) => {setEmail(e.target.value)}}
                                required 
                                className="form-control border-0"
                                />
                            </div>

                    </form>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>ارسال ایمیل</Button>
        </Modal.Footer>
      </Modal>


    return (
      <div>
         {content}
      </div>
     
    );
  }