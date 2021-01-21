
import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function UpdateProfile(props) {


  const [input , setInput] = useState({
    mobile_phone_number : "",
    account_number : "",
    email : ""
})

    
    const [userName, setUserName] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [studyField, setStudyField] = useState('');
    const [email, setEmail] = useState(' ');
    const [account, setAccount] = useState(' ');


 
  const [error, setError] = useState("");
  const [isResponced, setIsResponced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);



  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
 

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
        setEmail(`${res.data.email}`)

        // setIsAuthorized(true);
        setIsResponced(true);
        //console.log(userName);
      })
      .catch((error) => {
        setIsResponced(true);
        // setUserName()
        console.log("error:",error);
      })
  },[url])


  let validate = ()=>{
    let errors = "";
    let isValid = true;
  
    if (input.account_number === "") {
      isValid = false;
      errors = errors + "فیلد شماره حساب نمیتواند خالی باشد";
    }    
    if (input.mobile_phone_number === "") {
      isValid = false;
      errors = errors + "فیلد شماره تلفن نمیتواند خالی باشد";
    }
    if (input.email === "") {
        isValid = false;
        errors = errors +  "فیلد ایمیل نمیتواند خالی باشد";
      }
    
    setError(errors)
    return isValid;
  }
  
  
  let handleSubmit = (event) =>{
    
      

      setIsLoading(true);
      event.preventDefault();
      console.log("on submit");
      
      if(validate()){
        console.log("on call");
        
        axios.post(`${url}/api/identity/profile/update/`,
        
            {
                "mobile_phone_number": input.mobile_phone_number,
                "account_number": input.account_number,
                "email" : input.email,
            },
            {
              headers:{
                'authorization': `JWT ${getToken()}`,
                'Content-Type': 'application/json',}
            }
            
            )
            .then((res)=> {
              console.log(res.status);

             
                console.log("OK");
                setIsUpdate (true);
                props.onHide();
   
              setIsResponced(true);
              setIsLoading(false);

            })
            .catch(e => {
              console.log("error:",e);
             // props.show = true;
              setIsLoading(false);
              setIsResponced(true);
              setError(true);
            })
      }

  }
 
   
    


 
  let content= null;

   
    
    content=
          <Card className="text-right border-none">
            {/* <Card.Header className="bg-light text-center"> */}
              <Card.Title className="h5 text-primary text-right pt-4 px-4"><small className="text-primary">دانشجو:</small> {userName} </Card.Title>
            {/* </Card.Header> */}
            <Card.Body className="text-center">
             <div >
                  <form className=""  method="POST" onSubmit={(e) => {handleSubmit(e);setShow(true);}} >


                          <div className="form-group rounded-lg shadow-top-sm">
                              <label className="text-info text-right">شماره دانشجویی:</label>
                          <input 
                              aria-label="email" 
                              name="email" 
                              type="text" 
                              readOnly
                              className="form-control "
                              value={studentCode}
                              onChange={(e) => {setInput({...input, email : e.target.value})}}
                          />
                          </div>
                         
                          <div className="form-group rounded-lg shadow-top-sm">
                              <label className="text-info">رشته تحصیلی:</label>
                          <input 
                              aria-label="email" 
                              name="email" 
                              type="text" 
                              readOnly
                              className="form-control "
                              value={studyField}
                              onChange={(e) => {setInput({...input, email : e.target.value})}}
                          />
                          </div>      
                          
                          <div className="form-group rounded-lg shadow-top-sm" >
                              <label className="text-info">شماره تلفن:</label>
                          <input 
                              aria-label="mobile_phone_number"
                              name="mobile_phone_number"
                              id="mobile_phone_number" 
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => {setInput({...input, mobile_phone_number : e.target.value})}}
                              required 
                              className="form-control"
                              />
                          </div>

                          <div className="form-group rounded-lg shadow-top-sm" >
                              <label className="text-info" >شماره حساب:</label>
                          <input 
                              aria-label="account_number" 
                              name="account_number" 
                              type="text" 
                              required 
                              className="form-control "
                              value={account||null}
                              onChange={(e) => {setInput({...input, account_number : e.target.value})}}
                              />
                          </div>
                          <div className="form-group rounded-lg shadow-top-sm">
                              <label className="text-info">ایمیل:</label>
                          <input 
                              aria-label="email" 
                              name="email" 
                              type="text" 
                              required 
                              className="form-control "
                              value={email}
                              onChange={(e) => {setInput({...input, email : e.target.value})}}
                          />
                          </div>

                        

                            {error && <label variant="danger">{error}</label>}
                         
                            <div className="form-group">
                              <Button className="text-center" type="submit"> 
                              {isLoading? <Spinner animation="border" variant="primary" />:error?"تلاش دوباره"  : " تغییر رمزعبور"} 
                              </Button>
                            </div>

                  </form>
                  
             </div>

             </Card.Body>
            
         </Card>
   



   
if(isUpdate){
  content=
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
          رمزعبور شما با موفقیت تغییر کرد
            {/* {!isChanged?
            "رمزعبور شما با موفقیت تغییر کرد."
              :
              "  رمز عبور شما بنا به دلیلی تغییر نکرد:(  دوباره امتحان کنید"
            } */}
          </Toast.Body>
        </Toast>
      </div> 

}

if(error){
  content=
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
          تغییر رمزعبور شما با مشکل مواجه شد
          دوباره امتحان کنید
            {/* {!isChanged?
            "رمزعبور شما با موفقیت تغییر کرد."
              :
              "  رمز عبور شما بنا به دلیلی تغییر نکرد:(  دوباره امتحان کنید"
            } */}
          </Toast.Body>
         
        </Toast>
      </div> 

}



   return (
    <div>

      {content}

    </div>
  )
}
