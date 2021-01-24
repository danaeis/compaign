import React, { useEffect, useState } from "react";
import axios from 'axios'
import {getApi,getToken, setUserSession} from '../Utils/Common'
import 'font-awesome/css/font-awesome.min.css';

import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'
import CampDetail from './campDetail'
import { Redirect } from "react-router-dom";
import { CardColumns, CardImg, Col,Row } from "react-bootstrap";

export default function Compaign() {
  
  const [userCompaigns, setUserCompaigns] = useState([]);
  const [isResponced, setIsResponce] = useState(false);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [compId, setCompId] = useState(0);

 

  const url=getApi();
  
  let content = null;
  

  useEffect(()=>{
    axios.get(`${url}/api/reserve/camp/detail`,
      {
        headers:{
          'authorization': `JWT ${getToken()}`
        }
      })
      .then((res)=> {
        // console.log(res);
        setUserCompaigns([res.data.result]);
        setIsResponce(true);
        // console.log('total',userCompaigns);
      })
      .catch((error) => {
        console.log("error:",error);
        setIsResponce(true);
        setError(error);
      })
    },[url])

   

    let handleModal = (id) => {
      // console.log("on click",id)
      // setModalShow(true); 
      setCompId(id);
      <Redirect to={`/campaignDetail/${compId}`}/>
    } 

    




  if(isResponced){
    // console.log(userCompaigns);
    if(userCompaigns.length>0){
      // console.log(userCompaigns[0]);
      return(

        <div className="relative col-md-10 col-sm-10 col-lg-10 mx-auto my-auto">
        <div className="card text-center border-0 shadow z-depth-2 rounded">
          <Card >
              <Card.Header>
                <Card.Title className="pt-1">
                <small className="text-info">لیست اردوهای پیش رو :</small>
                </Card.Title>
              </Card.Header>


              {/* 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' */}
              <Card.Body className="text-center" style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto', 'background-color': 'primary' }}>
                
                

                
                    
                  <Row>
                  
                  {userCompaigns[0].map( (compaign, i) => 
                      
                      <Card className="text-center  col-xs-12 col-sm-6 col-md-4 " >
                          <Card.Body>
                            <CardImg variant="top" src={compaign.image} />
                            <Card.Title>{compaign.name}</Card.Title>
                            <Card.Text>
                            {compaign.description}
                            </Card.Text>
                            {/* <Button className="fixed bottom"  onClick={() => { handleModal(compaign.id)}} >{compaign.is_registered ?  "ثبت نام شده":"جزییات بیشتر .. "} </Button> */}
                            <Link className="fixed bottom"  to={`/campaignDetail/${compaign.id}`} >
                              
                              <Button>
                              {compaign.is_registered ?  "ثبت نام شده":"جزییات بیشتر .. "} 
                              </Button>
                            </Link>
                            
                          
                          </Card.Body>
                      
                      </Card>
                    
                )} 
                  
                  
                  </Row>
               
                
               
                
              </Card.Body>
          </Card>

        </div></div>



        
      );
    }
    else{
      return(
        
          <div dir="rtl">
            <p>
            اردویی جهت نمایش وجود ندارد . . . 
            </p>
          </div>
        
      );
    }
  }
  else{
    if(error){
      return(
        <div>
          خظا در برقراری ارتباط
        </div>
      )
    }
    else{
      return(
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }
  }
 
  return (
    <div>
      {content}
    </div>
  )
}