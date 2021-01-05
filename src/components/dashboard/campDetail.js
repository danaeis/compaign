import React, {useEffect, useState} from "react";
import axios from 'axios'
import {getApi,getToken} from '../Utils/Common'

import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

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
    <Modal>
      {error}
    </Modal>

  }
  if(isResponced ){

   console.log(compaign);
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
            </Modal.Body>
            <Modal.Footer >
                <Button className="text-center"  >{compaign.is_registered? "ثبت نام شده" : "ثبت نام "}</Button>
            </Modal.Footer>
        </Modal>

  }
  else{
    content = 
     <Modal>
         یافت نشد . . 
     </Modal>
    
  }

  

  return (
    <div >
      {content}
    </div>
  )
}