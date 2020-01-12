import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
//import styles from './styles/Login.module.css';
import {Link} from 'react-router-dom';
//import { Chart } from 'react-charts';
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';

//import {List, ListItem} from '@material-ui/Lists';
import styles from "./styles/Results.module.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,Legend,RadialBarChart,RadialBar} from 'recharts';
const data = [{Year: '2019', currentcurrentKL: 1,previousKL:1}, {Year:'2020',currentKL:1,previousKL:1},
{Year:'2021',currentKL:1,previousKL:2},{Year:'2022',currentKL:2,previousKL:3},
{Year:'2023',currentKL:2,previousKL:3}];

function Alltests(props){
  return(
    <tr>
      <td>{props.year}</td>
      <td>{props.kl}</td>
      <td>{props.progress}</td>
    </tr>
  )
}
class Results extends Component {
  constructor(props){
    super(props);
    this.state = {KL:0,actKL:3,alltests:[]}
}

componentDidMount(){
    this.interval = setInterval(() => {if(this.state.KL>this.state.actKL-2){clearInterval(this.interval)}this.setState({KL:this.state.KL+1})}, 500);
    let at=[{year:"2006",progress:"increased",kl:"1"}];
    for(var i=0;i<4;i++){
      at.push({year:"20xx",progress:"increased",kl:"xx"});
    }
    this.setState({alltests:at});
}
  render() {
    let color="blue";
    if(this.state.KL<=1){
        color="green"
    }
    else if(this.state.KL<=3){
        color="orange"
    }
    else{
        color="red"
    }
    //console.log(color);
    let list=[{id:1,content:"abc"},{id:2,content:"def"}]

    for(var i=3;i<50;i++)
    {
      list.push({id:i,content:i*20});
    }

    
    return (
        <div className={styles.resultcontainer} style={{backgroundColor:"white"}}>

            <div className={styles.compare} >
            <LineChart width={700} height={300} data={data} margin={{ top: 25, right: 20, bottom: 25, left: 0 }}>
                <Line type="monotone" dataKey="currentKL" stroke="green" />
                <Line type="monotone" dataKey="previousKL" stroke="red" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="Year" />
                <YAxis domain={[0,5]}/>
                <Tooltip/>
                <Legend/>
            </LineChart> 
            </div>

            <div className={styles.circular}>
            <CircularProgressbar styles={buildStyles({
          pathColor: color,
          textColor:color,
          pathTransitionDuration: 0.5,
          transition: 'stroke-dashoffset 0.0s ease 0s',
        })} value={this.state.KL} text={this.state.KL} minValue="0" maxValue="5"/>
            </div>
            <div className={styles.alltest}>
            <table style={{width:"100%",maxHeight:"200px",overflowY:"scroll"}}>
            <tr>
            <th>Year</th>
            <th>KL</th>
            <th>Progress</th>
            </tr>
            {
              this.state.alltests.map((test,index)=>{
                return(<Alltests
                year={test.year}
                kl={test.kl}
                progress={test.progress}
                />)
            })
            }
           
          </table>
            </div>
            <div className={styles.guide}>Guide
            <p>Stage 3 OA is classified as “moderate” OA. In this stage, the cartilage between bones
               shows obvious damage, and the space between the bones begins to narrow. People with 
               stage 3 OA of the knee are likely to experience frequent pain when walking, running, 
               bending, or kneeling.
                They also may experience joint stiffness after sitting for long periods of time or 
                when waking up in the morning. Joint swelling may be present after extended periods 
                of motion, as well.
            </p>
            </div>
            </div>
    );
  }
}

export default Results;
