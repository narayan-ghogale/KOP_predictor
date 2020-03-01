import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import p from './Register2.jpg'
import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import axios from 'axios';
import styles from './styles/Login.module.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let serverurl1='https://cryptic-eyrie-22433.herokuapp.com'
let serverurl2='https://localhost:3001'
class Register extends Component {

  constructor(props){
    super(props);
    this.state = {name:"",email:"",password:"",cpassword:"",message:"",success:false,link:"#",name:"",msg:""}
    this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
    this.onRegisterHandler=this.onRegisterHandler.bind(this);
}

onFormchangeHandler(e){
    const name=e.target.name;
    const value=e.target.value;
    this.setState({
        [name]:value
    },()=>{
        console.log(this.state);
        if(value==null||value===""){
          toast.error(name+" should not be empty");
        }
    })


}

onRegisterHandler(e){
    console.log(this.state);
    let email=this.state.email;
    let password=this.state.password;
    //if registration successful

    
    //checkfortype
    let allcorrect=true;
    if(this.state.email===""||this.state.password===""||this.state.password!==this.state.cpassword||this.state.name==="")
    {allcorrect=false
      if(this.state.password!==this.state.cpassword)
      toast.error("passwords dont match",{position:"top-right"});
      else
        toast.error("invalid entries");
    }

    if(allcorrect)
    {
    axios.post(serverurl1+"/register",{name:this.state.name,email:this.state.email,password:this.state.password})
    .then(res=>{
      this.setState({message:res.data});
      toast.success(res.data);
    });
    }
        e.preventDefault()
}



  render() {


    let message=<div>{this.state.message}</div>
    return (
        <div>
        <div className={styles.login_page}>
        <div className={styles.form}>
          <form>
            <input type="text" placeholder="name" name="name" onChange={this.onFormchangeHandler} value={this.state.name}/>
            <input type="text" placeholder="email" name="email" onChange={this.onFormchangeHandler} value={this.state.email}/>
            <input type="password" placeholder="password" name="password" onChange={this.onFormchangeHandler} value={this.state.password}/>
            <input type="cpassword" placeholder="confirm password" name="cpassword" onChange={this.onFormchangeHandler} value={this.state.cpassword}/>
            <button onClick={this.onRegisterHandler}>Register</button>
            <p className={styles.message}>{this.state.message}</p>
            <p className={styles.message}>Already have an account? <Link to="./login">Login here</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover/>
      </div>
    );
  }
}

export default Register;
