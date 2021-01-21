import React ,{useState} from "react";
import { Redirect } from 'react-router-dom';
import logo from "../../images/logo.jpg"
import axios from "axios";
import { setUserSession, getApi , getToken} from '../Utils/Common';
import ForgotPassword from './ForgotPassword';

import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import logo2 from "../../images/logo2.png"
import basij from "../../images/basij.jpg"

import { useParams } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';



export default function ResetPassword(props) {
    const {uid} = useParams();
    const {token} = useParams();
console.log(uid , token);


const [isLoading, setIsLoading] = useState(false); 
const [redirect, setRedirect] = useState(false);

const [error, setError] = useState(null);
const [state , setState] = useState({
    
    newpassword : "",
    renewpassword : ""
})

let handleSubmit = (event) =>{
    event.preventDefault();
    console.log(uid , token);
    let url = getApi();
    if(state.newpassword === state.renewpassword){
        console.log("on call");
       
        axios.post(`${url}/api/auth/users/reset_password_confirm/`,
        
            {
                "new_password": state.newpassword,
                "re_new_password": state.renewpassword,
                "token":token,
                "uid":uid,
            },
            {
              headers:{
                'Content-Type': 'application/json',
            }
            }
            
            )
            .then((res)=> {
              console.log(res.status);

              //if(res.status === 204){
                console.log("OK");
                
                props.onHide();
              //}
             
              setRedirect(true);
              setIsLoading(false);

            })
            .catch(e => {
              console.log("error:",e);
             // props.show = true;
              setIsLoading(false);
              
              setError(true);
            })
      }

}
// let handleChange =()=>{
//     console.log(uid , token);
// }


if(redirect) return <Redirect to='/login'/>;
return(
    <div>
        <div className="row align-items-center min-vh-100 ">
        <div className="col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
        <Card className="text-center">
            <Card.Header className="bg-light">
           
            <Row className=" px-auto">
              <Col xs={3} md={2} className="mx-auto mr-0">
                <Image src={logo2} rounded fluid/>
              </Col>
              {/* <Col xs={3} md={2} className="mx-auto mr-0">
                <Image src={basij} rounded fluid/>
              </Col> */}

              
              {/* <Col xs={5} md={5} >
                <p className=" text-info font-weight-bold ">
                  <br/><br/>
                سامانه اردوها ی دانشگاه شهید رجایی
                </p>
              </Col> */}

            </Row>
               
            <p className=" text-info font-weight-bold ">
                  <br/>
                سامانه اردوهای دانشگاه شهید رجایی
                </p>     
               
                </Card.Header>
            <Card.Body>
                <Card.Title className="pb-3">تعیین رمزعبور جدید</Card.Title>
                <Card.Text>
                <form className=""  method="POST" onSubmit={handleSubmit}>
                          
                          

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
                        <div className="form-group">
                            <Button className="text-center" type="submit"> 
                            {isLoading? <Spinner animation="border" variant="primary" />:"ثبت رمزعبور"} 
                            </Button>
                        </div>

                  </form>
                  
                </Card.Text>
                {/* <Button variant="primary">ثبت رمزعبور</Button> */}
            </Card.Body>
            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card> 
            
            
    </div></div></div>
)

}