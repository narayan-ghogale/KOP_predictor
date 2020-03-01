import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import styles from './styles/Dashboard.module.css';
import {Link} from 'react-router-dom';
import add from './styles/images/add2.svg'
import info from './styles/images/info2.svg'
import checklist from './styles/images/checklist2.svg'
import user from './styles/images/user3.svg'
import team from './styles/images/team.svg'
import resources from './styles/images/resources.svg'
import {Container,Row,Col} from 'react-bootstrap'
import store from 'store';
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onLogout=this.onLogout.bind(this);
}

onLogout(e){
  alert("are you sure?");
}
  render() {
    return (
        <div style={{textAlign:"center",alignItems:"center"}}>
            <div><h1   textAlign="center">What do you want to Do? {store.get('email')}</h1></div>
            <Container className={styles.dashboardcontainer}>
              <Row>
                    <Col>
                    <button className={styles.logout} style={{float:"right"}} onClick={this.onLogout}>👋LOGOUT</button>
                    </Col>
              </Row>
              <Row>
                    <Col><Link to="./details"  ><button className={styles.block} ><img src={add} className={styles.imagebox}/><p>Start a new test</p></button></Link></Col>
                    <Col><Link to="./results"><button className={styles.block} > <img src={checklist} className={styles.imagebox}/><p>View past Analysis</p></button></Link></Col>
                    <Col><Link to="./profile"><button className={styles.block}  ><img src={user} className={styles.imagebox}/><p>View/Edit profile</p></button></Link></Col>

              </Row>  
              <Row> 
              <Col><a href="https://orthoinfo.aaos.org/en/diseases--conditions/arthritis-of-the-knee/"><button className={styles.block} ><img src={info} className={styles.imagebox}/><p>Know more about KoA</p></button></a></Col>

              <Col><Link to="./dashboard"><button className={styles.block} styles={{opacity:"0.5"}} ><img src={team} className={styles.imagebox}/><p>Get to know more about us</p></button></Link></Col>
              <Col><a href="https://github.com/narayan-ghogale/KOP_predictor.git"><button className={styles.block} ><img src={resources} className={styles.imagebox}/><p>Resources for this project</p></button></a></Col>
              </Row>   
            </Container>
            
           
        </div>
    );
  }
}

export default Dashboard;
