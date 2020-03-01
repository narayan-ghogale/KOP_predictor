import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import p from './login2.jpg'
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import axios from 'axios';
import styles from './styles/Login.module.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from 'store'
let serverurl1='https://cryptic-eyrie-22433.herokuapp.com'
let serverurl2='https://localhost:3001'
class Login extends Component {

  constructor(props){
    super(props);
    this.state = {email:null,password:null,message:"",success:false,link:"#",color:""}
    this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
    this.onLoginHandler=this.onLoginHandler.bind(this);
}



onFormchangeHandler(e){
    const name=e.target.name;
    const value=e.target.value;
    console.log(name);
    //console.log(sname);
    if(value===null||value===""){
        this.setState({message:name+" cannot be empty"});
    }
    {this.setState({
        [name]:value
    },()=>{
        console.log(this.state);
    })
}
}

onLoginHandler(e){
    //console.log(this.state);
    let email=this.state.email;
    let password=this.state.password;
    let abc=112;

    //requests
    axios.post(serverurl1+'/login',{email:email,password:password})
    .then(res=>{
      console.log("worked");
      console.log(res.data);
      if(res.data==="success"){
        store.set('email',email)
        toast.success("Login successful, Redirecting",{position:"top-right"});
        setTimeout(()=>{
                var linkToClick = document.getElementById('something');
                linkToClick.click();
              },3000);
      }
      else{
        toast.success("Either username or password incorrect",{position:"top-right"});
        this.setState({
          message:"either username or password incorrect"
        })
        console.log("failed");
      }
    })


    // offline testing
    // if(email==="user"&&password==="pass")
    // {
    //   // var linkToClick = document.getElementById('something');
    //   // linkToClick.click();
    //   abc=111;
    //   toast.success("✅Login Successful, Redirecting...", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true
    //     });
    //     setTimeout(()=>{
    //       var linkToClick = document.getElementById('something');
    //       linkToClick.click();
    //     },3000);
    // }
    // else{
    //   toast.error("⚠️Login Failed", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true
    //     });
    // }
   e.preventDefault()
}



  render() {


    let message=<div>{this.state.message}</div>
    return (
        <div className={styles.login_page}>
        <div className={styles.form}>
          <form>
            <input type="text"  placeholder="username" name="email" onChange={this.onFormchangeHandler} value={this.state.email}/>
            <input type="password" placeholder="password" name="password" onChange={this.onFormchangeHandler} value={this.state.password}/>
            <button onClick={this.onLoginHandler}>login</button>
            <p className={styles.message}>{this.state.message}</p>
            <Link id="something" to="./dashboard"></Link>
            <p className={styles.message}>Not registered? <Link to="./register">Create an Account</Link></p>
          </form>
         
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

export default Login;
