import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import p from './login2.jpg'
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
//import axios from 'axios';
import styles from './styles/Login.module.css';
class Login extends Component {

  constructor(props){
    super(props);
    this.state = {email:null,password:null,message:"",success:false,link:"#",color:""}
    this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
    this.onLoginHandler=this.onLoginHandler.bind(this);
    this.checkparameter=this.checkparameter.bind(this);
}

checkparameter(e){
    console.log("in parameter checking");
    let email=this.state.email;
    let password=this.state.password;
    let name=eval("this.state"+e.target.name);
    console.log(name);
    if(name===null||name===""){
        this.setState({message:name+"cannot be empty"});
    }
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
    console.log(this.state);
    let email=this.state.email;
    let password=this.state.password;
    let abc=112;
    if(email==="a"&&password==="b")
    {
      // var linkToClick = document.getElementById('something');
      // linkToClick.click();
      abc=111;
      this.setState({
        message:"Login Successful...Redirecting"
      },()=>{
        if(this.state.message="Login Successful...Redirecting")
    {
    var linkToClick = document.getElementById('something');
    linkToClick.click();
    }else{
      console.log("failed linking");
    }
      });
    }
    else{
      this.setState({
        message:"either username or password incorrect"
      })
      console.log("failed");
    }

    //   let email=this.state.email;
    //   let password=this.state.password;
    //   let data="safaw";
    //   axios.post('http://b03384b6.ngrok.io/internal/login',data)
    //   .then(res=>{console.log("whoaa!!!!")})

    //     axios.post('http://b03384b6.ngrok.io/internal/login',{email,password})
    //     .then(res=>{
    //         const message = res.data.success;
    //         console.log(res);
    //        if(message)
    //        {
    // var linkToClick = document.getElementById('something');
    // linkToClick.click();
    // }else{
    //   console.log("failed")
    // }})
    //     .catch(err=>{
    //         console.log(err);
    //     });
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
      </div>
    );
  }
}

export default Login;
