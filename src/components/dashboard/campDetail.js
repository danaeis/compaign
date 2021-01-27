import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Card,CardImg } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import logo2 from "../../images/logo2.png"
import Header from "./Header";
import { useParams } from 'react-router-dom';

export default function CampDetail(props) {

  const {id} = useParams();
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
    axios.get(`${url}/api/reserve/camp/detail/${id}/`,
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
        <div className="relative col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
            <div className="card text-center border-0 shadow z-depth-2 rounded">
              <Card className="text-center">
                  <Card.Header className="bg-light text-center">
                  <Row className=" px-auto">
                  

                  </Row>
                  <Card.Title className="text-primary">{compaign.name}</Card.Title>
                
                
                    </Card.Header>
                  <Card.Body className="text-center" style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto', 'background-color': 'primary' }} >
                  
                  {(compaign.image)? 
                          <Card.Img 
                            variant="top" 
                            className="mx-auto my-2 col-md-6" 
                            // onClick={()=> { return(<Redirect to={"https://" + compaign.image.substr(16,compaign.image.length)}/>)}}
                            src={"https://" + compaign.image.substr(16,compaign.image.length)} 
                            alt="پوستر اردو" 
                            height="100%"/>
                          
                          :<Card.Img variant="top" className="mx-auto my-2" src="#" alt="پوستر اردو" />}
                  
                      <h5 className="text-black">
                        <small className="ml-3 text-info ">توضیحات اردو:</small>
                      {compaign.description} 
                      </h5>
                      <h5 className="text-primary">
                        <small className="text-info">هزینه ثبت نام:     </small>
                          {compaign.cost} 
                          <small className="text-black">    تومان </small>

                        </h5>
                      <h5 className="text-primary">
                        <small className="text-info">زمان برگزاری: </small>
                        {compaign.execution_time}
                        </h5>
                        <Button className="text-center my-3 px-5"  >{compaign.is_registered? "ثبت نام شده" : "ثبت نام "}</Button>
                  </Card.Body>
                  {/* <Card.Footer >
                      <Button className="text-center"  >{compaign.is_registered? "ثبت نام شده" : "ثبت نام "}</Button>
                  </Card.Footer> */}
              </Card>
            </div>
        </div>

  }
  else{
    content = 
     <Card>
         یافت نشد . . 
     </Card>
    
  }

  

  return (
    <div >
      <Header></Header>
      {content}
    </div>
  )
}