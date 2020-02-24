import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
//import styles from './styles/Login.module.css';
import {Link} from 'react-router-dom';
import { Tab } from 'material-ui';
import styles from './styles/Welcome.module.css'
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {}
}
  render() {
    return (
        <div>
            
            
            <div classNam={styles.splashcontainer}>
              <div class={styles.splash}>
              <h1 class={styles.splashhead}>Welcome to Knee Osteoarithritis Predictor</h1>
              <p class={styles.splashsubhead}>
                This is available to all patients who seek to know and analyse their progress over the time
              </p>
              <p>
              <Link to="./login"><button className={styles.startedbutton} >Get started</button></Link>
              </p>
              </div>
              </div>
        </div>
    );
  }
}

export default Welcome;
