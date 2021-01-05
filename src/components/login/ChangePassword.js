
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


export default function ChangePassword(props) {


  const [state , setState] = useState({
    curPassword : "",
    newpassword : "",
    renewpassword : ""
})


 
  const [error, setError] = useState(null);
  const [isResponced, setIsResponced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);



  const [show, setShow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
 

  const url=getApi();
  
  let handleSubmit = (event) =>{
    
      console.log(state.curPassword + " and " + state.newpassword + " and " + state.renewpassword);


      setIsLoading(true);
      event.preventDefault();
      console.log("on submit");
      console.log(state.newpassword );
      if(state.newpassword === state.renewpassword){
        console.log("on call");
        setReset(true);
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

              if(res.status === 204){
                console.log("OK");
                setIsChanged (true);
                props.onHide();
              }
              setIsResponced(true);
              setIsLoading(false);

            })
            .catch(e => {
              console.log("error:",e);
              setIsLoading(false);
              setIsResponced(true);
              // setError([e]);
              // console.log(error);
            })
      }

  }
 
   
    


 
  let content= null;

   
    
    content=
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter text-right">
                
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
             <div>
                  <form className=""  method="POST" >
                          
                          <div className="form-group border rounded-lg shadow-top-sm" >
                          <input 
                              aria-label="userName "
                              name="curPassword"
                              id="curPassword" 
                              type="text"
                              placeholder="رمز عبور فعلی"
                              onChange={(e) => {setState({...state, curPassword : e.target.value})}}
                              required 
                              className="form-control border-0"
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
                         
                            {error && <label variant="danger">{error}</label>}
                         

                  </form>
                  
             </div>

            </Modal.Body>
            <Modal.Footer >
                <Button className="text-center" onClick={(e) => {handleSubmit(e);setShow(true);}} > {isLoading? <Spinner animation="border" variant="primary" />:error?"تلاش دوباره"  : " تغییر رمزعبور"} </Button>
            </Modal.Footer>
        </Modal>
   



   
if(isChanged){
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

// content = 
//       <div className="fixed-bottom mx-4 my-4">
//         <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
//           <Toast.Header>
//           <strong className="mr-auto text-primary text-right">سامانه اردوها</strong>
// <p></p>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded mr-2"
//               alt=""
//             />
            
            
//             <small></small>
//           </Toast.Header>
//           <Toast.Body>
//             {isChanged?
//             "رمزعبور شما با موفقیت تغییر کرد."
//               :
//               "  رمز عبور شما بنا به دلیلی تغییر نکرد:(  "
//               +
//               "دوباره امتحان کنید"
//             }
//           </Toast.Body>
//         </Toast>
//       </div> 





   return (
    <div>
      {content}

      {/* <div className="fixed-bottom mx-4 my-4">
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
            {isChanged?
            "رمزعبور شما با موفقیت تغییر کرد."
              :
              "  رمز عبور شما بنا به دلیلی تغییر نکرد:(  "
              +
              "دوباره امتحان کنید"
            }
          </Toast.Body>
        </Toast> */}
      {/* </div>  */}
    </div>
  )
}
