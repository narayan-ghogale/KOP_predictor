import React, { Component } from 'react';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';
//import styles from './styles/Profile.module.css'
import Input from '@material-ui/core/Input'
import styles from './styles/Profile.module.css'
import{Container,Row,Col} from 'react-bootstrap'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
class Profile extends Component {
  constructor(props){
    super(props);
	this.state = {name:"Narayan Ghogale",email:"naraghogale@gmail.com",oldpass:"",newpass:"",newpassconfirm:""};
	this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
	this.changePassword=this.changePassword.bind(this);

}
changePassword(e){
	console.log("changing pasword");
	if(this.state.newpass!==this.state.newpassconfirm){
		toast.error("New Passwords should match", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
			});
	}
	else{
		axios.post("http://localhost:3001/changepass",{mail:this.state.email,oldpass:this.state.oldpass,newpass:this.state.newpass}).
		then(res=>{
			toast.info(res.data, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
				});
		})
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
  render() {
    return (
        <div >
            
            <Container>
				<Row style={{margin:"30px"}}>
				<Col  lg="6" xs="12">
					<div className={styles.profilecolumn}> 
					<h3>YOUR INFORMATION</h3>
					<label style={{display:"block",padding:"10px",margin:"5px"}}>NAME</label>
					<input style={{display:"block",padding:"10px",margin:"5px",width:"100%"}} value={this.state.name} disabled></input>
					<label style={{display:"block",padding:"10px",margin:"5px"}}>EMAIL</label>
					<input style={{display:"block",padding:"10px",margin:"5px",width:"100%"}} value={this.state.email} disabled></input>
					</div>
				</Col>
				<Col lg="6" xs="12">
					<div className={styles.profilecolumn}>
					<h3>CHANGE PASSWORD</h3>
					<label style={{display:"block",padding:"10px",margin:"5px"}}>OLD PASSWORD</label>
					<input  style={{display:"block",padding:"10px",margin:"5px",width:"100%"}}name="oldpass" value={this.state.oldpass} onChange={this.onFormchangeHandler}></input>
					<label style={{display:"block",padding:"10px",margin:"5px"}}>NEW PASSWORD</label>
					<input style={{display:"block",padding:"10px",margin:"5px",width:"100%"}} name="newpass" value={this.state.newpass} onChange={this.onFormchangeHandler}></input>
					<label style={{display:"block",padding:"10px",margin:"5px"}}>CONFIRM NEW PASSWORD</label>
					<input style={{display:"block",padding:"10px",margin:"5px",width:"100%"}} name="newpassconfirm" value={this.state.newpassconfirm} onChange={this.onFormchangeHandler}></input>
					<br></br>
					<button className={styles.changepassbutton} style={{display:"block",padding:"10px",margin:"5px"}} onClick={this.changePassword}>CHANGE</button>
					</div>
				</Col>
				</Row>
			</Container>
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

export default Profile;
