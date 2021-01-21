import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Card } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import logo2 from "../../images/logo2.png"
import Profile from "./Profile";

export default function CampDetail(props) {

  const [compaign, setCompaign] = useState([]);
  const [error, setError] = useState(null);
  const [isResponced, setIsResponced] = useState(false);
 
  let content = null;
  const url=getApi();
  // let campid = props.id;
  // console.log(props.id , "camp id");
  // setCompaign(props.res);
  // setIsResponced(props.responce);
  // setError(props.error);
    

  useEffect(()=>{
    axios.get(`${url}/api/reserve/camp/detail/${props.id}/`,
      {
        headers:{
          'authorization': `JWT ${getToken()}`
        }
      })
      .then((res)=> {
        // console.log(res);
        setCompaign(res.data);
        setIsResponced(true);
        
        // console.log('total',userCompaigns);
      })
      .catch((error) => {
        console.log("error:",error);
        setIsResponced(true);
        setError(error);
      })
    },[url])

  
  if (error) {
    content=
    <Card>
      {error}
    </Card>

  }
  if(isResponced ){

   console.log(compaign);
        content=
        <Card className="text-center">
            <Card.Header className="bg-light text-center">
            <Row className=" px-auto">
              <Col xs={3} md={2} className="mx-auto mr-0">
                <Image src={logo2} rounded fluid/>
              </Col>
              
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
            <Card.Body className="text-center">
            
                <h4 className="text-primary">{compaign.name}</h4>
                <h5 className="text-black">
                {compaign.description} 
                </h5>
                <h5 className="text-primary">
                  <small className="text-black">هزینه ثبت نام:     </small>
                     {compaign.cost} تومان
                  
                  </h5>
                <h5 className="text-primary">
                  <small className="text-black">زمان برگزاری: </small>
                  {compaign.execution_time}
                  </h5>
            </Card.Body>
            <Card.Footer >
                <Button className="text-center"  >{compaign.is_registered? "ثبت نام شده" : "ثبت نام "}</Button>
            </Card.Footer>
        </Card>

  }
  else{
    content = 
     <Card>
         یافت نشد . . 
     </Card>
    
  }

  

  return (
    <div >
      {Profile}
      {content}
    </div>
  )
}