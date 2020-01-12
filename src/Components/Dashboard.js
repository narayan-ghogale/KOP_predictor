import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import styles from './styles/Dashboard.module.css';
import {Link} from 'react-router-dom';
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {}
}
  render() {
    return (
        <div>
            <h1 class="display">What do you want to Do?</h1>
            <div className={styles.dashboardcontainer}>
                    <Link to="./details"><button className={styles.block} >Start a new test</button></Link>
                    <Link to="./results"><button className={styles.block} >View past Analysis</button></Link>
                    <Link to="./details"><button className={styles.block} >View/Edit profile</button></Link>
                    <Link to="./details"><button className={styles.block} >Know more about Knee Osteoarithritis</button></Link>
            </div>
        </div>
    );
  }
}

export default Dashboard;
