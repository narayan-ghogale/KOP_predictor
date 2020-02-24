import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import p from './Register2.jpg'
import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import axios from 'axios';
import styles from './styles/Login.module.css';
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
        if(this.state.password!==this.state.cpassword){
          this.setState({message:"passwords dont match"});
        }else{
          this.setState({message:""});
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
    {allcorrect=false};

    if(allcorrect)
    {
    //   this.setState({
    //     message:"Registeration Successful...Login to continue"
    //   },()=>{
    //     if(this.state.message==="Registeration Successful...Login to continue")
    // {
    // }else{
    //   this.setState({message:"Redirection failed.. please try again"});
    // }
    //   });
    axios.post("http://localhost:3001/register",{name:this.state.name,email:this.state.email,password:this.state.password})
    .then(res=>{
      this.setState({message:res.data});
    });

    }
    else{
      this.setState({
        message:"Please check details"
      })
      console.log("failed");
    }

    //   let email=this.state.email;
    //   let password=this.state.password;
    //   let data="safaw";
    //   axios.post('http://b03384b6.ngrok.io/internal/Register',data)
    //   .then(res=>{console.log("whoaa!!!!")})

    //     axios.post('http://b03384b6.ngrok.io/internal/Register',{email,password})
    //     .then(res=>{
    //         const message = res.data.success;
    //         console.log(res);
    //        if(message)
    //        {
   
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
    );
  }
}

export default Register;
