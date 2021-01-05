import React from "react";
import { Redirect } from 'react-router-dom';
import logo from "../../images/logo.jpg"
import axios from "axios";
import { setUserSession, getApi} from '../Utils/Common';
import ForgotPassword from './ForgotPassword';

import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      loading: false,
      redirect: false,
      isError: false,

      forgotShow: false,

      errorShow:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleShow(){
    // this.state.forgotShow=true;
    this.setState({ forgotShow:true });
  }
  handleClose(){
    // this.state.forgotShow=false;
    this.setState({ forgotShow:false });
  }

  handleChange(event) {
      let input = this.state.input;
      input[event.target.name] = event.target.value;
    
   
      this.setState({
        input
      });
  }



  handleSubmit(event) {
      event.preventDefault();
      this.setState({ loading: true });
      // const history = useHistory()
      
      if(this.validate()){
        this.setState({loading:true , errors:[]});
        const url=getApi();
        axios.post(`${url}/api/auth/jwt/create`,{
            student_code : this.state.input.userName,
            password : this.state.input.password,
        }
        ).then( response => {

        console.log(response.data);
        this.setState({ loading: false});
        //setAccessToken(response.data.access);
        setUserSession(response.data.access,response.data.refresh);
        this.setState({ redirect: true });
          
  
        }).catch(([error]) => {
          this.state({errorShow:true})
          this.setState({errors : error});
          this.setState({ isError: true });
          // //console.log(this.state.errors[0].response.status);
          // if (this.state.errors[0].response.status === 401) this.setState({ errors:[error.response.data.detail]});
          // else this.setState({ errors:["something went wrong"]});
          console.log("error",this.state.errors , "is error" , this.state.isError);
          this.setState({ loading: false });
          
        });
        
      }
      
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
  
      if (!input["userName"]) {
        isValid = false;
        errors["userName"] = "Please enter your name.";
      }    
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      this.setState({
        errors: errors
      });
      
      return isValid;
  }
  
  // handleKeypress (event) {
  //     //it triggers by pressing the enter key
  //   if (event.keyCode === 13) {
  //     handleSubmit(event);
  //   }
  // }
  
  
  render() {
      
    const {redirect} = this.state; 
    const {isError} = this.state;
    // {console.log(this.state.errors)} 
    
    if (redirect) {
      return <Redirect to='/dashboard'/>;
    }
    


    return ( 

          <div className="row align-items-center min-vh-100 ">
              <div className="col-md-6 col-sm-10 col-lg-5 mx-auto my-auto">
                <div className="card text-center border-0 py-5 px-3 shadow z-depth-2 rounded">
                  <div className="mx-5 md:my-5 md:px-5">
                    <img className="card-img-top px-5" src={logo} alt="university logo" />                
                  </div>
                  <div className="card-body">
                  <form className="" method="POST" onSubmit= {this.handleSubmit} >
                          <div className="form-group border rounded-lg shadow-top-sm" >
                          <input 
                              aria-label="userName "
                              name="userName"
                              id="username" 
                              type="text"
                              placeholder="شماره ی دانشجویی"
                              onChange={this.handleChange} 
                              required 
                              className="form-control border-0"
                              />
                          </div>
                          <div className="form-group">
                          <input 
                              aria-label="Password" 
                              name="password" 
                              type="password" 
                              required 
                              className="form-control "
                              placeholder="رمز عبور"
                              onChange={this.handleChange}
                              
                          />
                          </div>


                          

                        {console.log(this.state.isError)}
                        {this.state.isError  ? 
                              <React.Fragment>
                              <div className="alert alert-danger" role="alert">
                              {this.state.errors}
                              </div></React.Fragment> : null }

                     
                          <div className="text-center">
                            <Button
                                    type="submit"
                                    varient="primary"
                                    className=" d-block text-center align-center "
                                    // value = 
                                    // onClick={this.handleSubmit}
                                    >
                                    
                                    {this.state.loading ? 'Loading...' : 'ورود'}
                            </Button>
                          </div>
             
                      <Button className="text-primary" variant="light" onClick={this.handleShow}>
                          رمزعبور خود را فراموش کرده اید؟
                          </Button>

                          {this.state.forgotShow &&
                            <ForgotPassword
                            show={this.state.forgotShow}
                            onHide={this.handleClose}
                          />
                          
                          }
                  </form>
                  </div>
                </div>
              </div>
          
            {this.state.isErro &&
            <div className="fixed-bottom mx-4 my-4">
              <Toast onClose={() => this.state.errorShow=false} show={this.state.errorShow} delay={5000} autohide>
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
                <Toast.Body>{this.state.errors}</Toast.Body>
              </Toast>
            </div> }
          </div>
          
          );
  }
}


export default LoginForm