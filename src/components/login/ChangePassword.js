
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

export default function ChangePassword(props) {


  const [state , setState] = useState({
    curPassword : "",
    newpassword : "",
    renewpassword : ""
})


  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isResponced, setIsResponced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);



  const [show, setShow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
 

  const url=getApi();
  
  let handleSubmit = (event) =>{
    
      console.log(state.curPassword + " and " + state.newpassword + " and " + state.renewpassword);

      setIsChanged(false);
      setIsLoading(true);
      event.preventDefault();
      
      console.log(state.newpassword );
      if(state.newpassword === state.renewpassword){
        
      
        axios.post(`${url}/api/auth/users/set_password/`,
        
            {
                "new_password": state.newpassword,
                "re_new_password": state.renewpassword,
                "current_password" : state.curPassword
            },
            {
              headers:{
                'authorization': `JWT ${getToken()}`,
                'Content-Type': 'application/json',}
            }
            
            )
            .then((res)=> {
              console.log(res.status);
              setShow(true);
              //if(res.status === 204){
                console.log("OK");
                setIsChanged (true);
                //props.onHide();
              //}
              setIsResponced(true);
              setIsLoading(false);
              setIsError(false);

            })
            .catch(e => {
              console.log("error:",e.response.data);
              if(e.response.data["current_password"]){
                setError("رمز فعلی اشتباه است\n");
              }
              if(e.response.data["new_password"]){
                setError("رمز جدید وارد شده بسیار ضعیف است"+"\n");
              }
              else{
                setError(
                  "تغییر رمزعبور شما با مشکل مواجه شد"+
                "دوباره امتحان کنید" 
                );
              }
              setShow(true);
              setIsLoading(false);
              setIsResponced(true);
              setIsError(true);
            })
      }
      else{
        setError("رمز وارد شده و تکرار آن یکسان نمیباشد\n");
        setIsError(true);
        setIsLoading(false);
      }

  }
 
   
    


 
  let content= null;

   
    
    content=
          <Card className="text-center border-0">
            <Card.Title className="h5 text-primary text-right pt-4 px-4"><small className="text-primary">برای تغییر رمزعبور اطلاعات زیر را تکمیل کنید:</small> </Card.Title>
            <Card.Body className="text-center">
            
             <div>
                  <form className=""  method="POST" onSubmit={(e) => {handleSubmit(e);}} >
                    
                          <div className="form-group border rounded-lg shadow-top-sm" >
                          <input 
                              aria-label="cuPassword"
                              name="curPassword"
                              id="curPassword" 
                              type="password"
                              placeholder="رمز عبور فعلی"
                              onChange={(e) => {setState({...state, curPassword : e.target.value})}}
                              required 
                              className="form-control"
                              />
                          </div>

                          <div className="form-group border rounded-lg shadow-top-sm" >
                          <input 
                              aria-label="newPassword" 
                              name="newpassword" 
                              type="password" 
                              required 
                              className="form-control "
                              placeholder="رمز عبور جدید"
                              onChange={(e) => {setState({...state, newpassword : e.target.value})}}
                              />
                          </div>
                          <div className="form-group rounded-lg shadow-top-sm">
                          <input 
                              aria-label="renewPassword" 
                              name="renewpassword" 
                              type="password" 
                              required 
                              className="form-control "
                              placeholder="تکرار رمز عبور جدید"
                              onChange={(e) => {setState({...state, renewpassword : e.target.value})}}
                          />
                          </div>
                         
                          <label variant="danger" className="texts text-danger py-3">
                          {isError ? error 
                          :null }
                        </label>
                            <div className="form-group">
                              <Button className="text-center" type="submit"> 
                              {isLoading? <Spinner animation="border" variant="primary" />:" تغییر رمزعبور"} 
                              </Button>
                            </div>
                            

                  </form>
                  
             </div>

            </Card.Body>
            
        </Card>
   

let result=null;

   
if(isChanged){
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
          رمزعبور شما با موفقیت تغییر کرد
         
          </Toast.Body>
        </Toast>
      </div> 

}

// if(error){
//   result=
//   <div className="fixed-bottom mx-4 my-4">
//         <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
//           <Toast.Header>
//           <strong className="mr-auto text-primary text-right">سامانه اردوها</strong>
//             <p></p>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded mr-2"
//               alt=""
//             />
            
            
//             <small></small>
//           </Toast.Header>
//           <Toast.Body>
//           تغییر رمزعبور شما با مشکل مواجه شد
//           دوباره امتحان کنید
            
//           </Toast.Body>
          
//         </Toast>
//       </div> 

// }



   return (
    <div>
      {content}
      {result}
     
    </div>
  )
}
