import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
//import styles from './styles/Login.module.css';
import {Link} from 'react-router-dom';
//import { Chart } from 'react-charts';
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import {Container,Row,Col} from 'react-bootstrap'
//import {List, ListItem} from '@material-ui/Lists';
import styles from "./styles/Results.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from '@material-ui/core'
import store from 'store'
import axios from 'axios'
import eye from './styles/images/eye.png'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,Legend,RadialBarChart,RadialBar,ResponsiveContainer} from 'recharts';
const data = [{Year: '2019', currentcurrentKL: 1,previousKL:1}, {Year:'2020',currentKL:1,previousKL:1},
{Year:'2021',currentKL:1,previousKL:2},{Year:'2022',currentKL:2,previousKL:3},
{Year:'2023',currentKL:2,previousKL:3}];

let serverurl1='https://cryptic-eyrie-22433.herokuapp.com'
let serverurl2='http://localhost:3001'

let KLinfo=['Stage 0 OA is classified as “normal” knee health. The knee joint shows no signs of OA and the joint functions without any impairment or pain.Congrats you are perfectly fine',
  'A person with stage 1 OA is showing very minor bone spur growth. Bone spurs are boney growths that often develop where bones meet each other in the joint.Someone with stage 1 OA will usually not experience any pain or discomfort as a result of the very minor wear on the components of the joint.',
'Stage 2 OA of the knee is considered a “mild” stage of the condition. X-rays of knee joints in this stage will reveal greater bone spur growth, but the cartilage is usually still at a healthy size, i.e. the space between the bones is normal, and the bones are not rubbing or scraping one another.At this stage, synovial fluid is also typically still present at sufficient levels for normal joint motion.',
'Stage 3 OA is classified as “moderate” OA. In this stage, the cartilage between bones shows obvious damage, and the space between the bones begins to narrow. People with stage 3 OA of the knee are likely to experience frequent pain when walking, running, bending, or kneeling.They also may experience joint stiffness after sitting for long periods of time or when waking up in the morning. Joint swelling may be present after extended periods of motion, as well.',
'Stage 4 OA is considered “severe.” People in stage 4 OA of the knee experience great pain and discomfort when they walk or move the joint.That’s because the joint space between bones is dramatically reduced—the cartilage is almost completely gone, leaving the joint stiff and possibly immobile. The synovial fluid is decreased dramatically, and it no longer helps reduce the friction among the moving parts of a joint.']

let KLcolors=['green','blue','yellow','orange','red','violet']

function Alltests(props){
  return(
    <tr onClick={()=>{props.getgraph(props.index)}}>
      <td><img src={eye}></img></td>
      <td>{props.year}</td>
      <td>{props.kl}</td>
      <td>{props.progress}</td>
    </tr>
  )
}
class Results extends Component {
  constructor(props){
    super(props);
    this.state = {KL:0,actKL:0,alltests:[],dbresult:[]}
    this.getgraph=this.getgraph.bind(this);
}

getgraph(index){
  if('futurekls' in this.state.dbresult[index])
  this.setState({data2:this.state.dbresult[index].futurekls})
}
componentDidMount(){
    // if(store.get('predictedKL')!=null){
      // this.setState({actKL:store.get('predictedKL')},()=>{
        // if(this.state.actKL!=0){
        //   this.interval = setInterval(() => {if(this.state.KL>this.state.actKL-2){clearInterval(this.interval)}this.setState({KL:this.state.KL+1})},500);
        //   }
          let at=[];

          // for(var i=0;i<4;i++){
          //   at.push({year:"20xx",progress:"increased",kl:"xx"});
          // }
          
          axios.post(serverurl1+"/alltests",{email:store.get('email')})
          .then(
            res=>{
              console.log(res.data);
              let all=res.data;
              this.setState({dbresult:all})
              at.push({year:all[0].currentime,progress:"-",kl:all[0].currentkl})
              for(var i=1;i<all.length;i++){
                let p="unchanged";
                if(all[i].currentkl>all[i-1].currentkl){
                  p="increased"
                }
                else if(all[i].currentkl<all[i-1].currentkl){
                  p="decreased"
                }
                at.push({year:all[i].currentime,progress:p,kl:all[i].currentkl})
              }

              // if()
              // let f1=all[all.length-1].futurekls;
              // f1.unshift({time:all[all.length-1].currentime,kl:all[all.length-1].currentkl})
              // this.setState({data2:f1})
              let f1=[{time:"testime",kl:3}]
              this.setState({data2:f1,actKL:parseInt(all[all.length-1].currentkl)})
            }
          )  
          this.setState({alltests:at});
      // });
    // }
    
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
    // let predictedKL=2;
    // if(store.get('predictedKL')!=null)
    // predictedKL=store.get('predictedKL');
    
    return (
        <div>
          <h1>Result {this.state.actKL}</h1>
          <Container>
            <Row>
              <Col>
              <ResponsiveContainer>
                <div className={styles.resultcard}>
                  <h4>Future KLs</h4>
                <LineChart  overflowY="auto" width={700} height={340} data={this.state.data2} margin={{ top: 25, right: 20, bottom: 25, left: 0 }}>
                <Line type="monotone" dataKey="kl" stroke="green" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0,5]}/>
                <Tooltip/>
                <Legend/>
                </LineChart> 
            </div>
            </ResponsiveContainer>

            </Col>
            <Col>
            <div className={styles.resultcard} >
            {/* <CircularProgressbar styles={buildStyles({
          pathColor: color,
          textColor:color,
          pathTransitionDuration: 0.5,
          transition: 'stroke-dashoffset 0.0s ease 0s',
        })} value={this.state.KL} text={this.state.KL} minValue="0" maxValue="5"/> */}
          <h4>Latest KL</h4>
          <h1 style={{fontSize:255,color:KLcolors[this.state.actKL]}}>{this.state.actKL}</h1>
            </div>

            </Col>
            </Row>
            <Row style={{marginTop:"1%"}}>
            <Col><div className={styles.resultcard} >
            <table style={{width:"100%",maxHeight:"200px",overflowY:"scroll"}}>
            <tr>
            <th>View</th>
            <th>Date</th>
            <th>KL</th>
            <th>Progress</th>
            </tr>
            {
              this.state.alltests.map((test,index)=>{
                return(<Alltests
                index={index}
                year={test.year}
                kl={test.kl}
                progress={test.progress}
                getgraph={this.getgraph}
                />)
            })
            }
           
          </table>
            </div></Col>            
            <Col><div className={styles.resultcard}>
              <h4>Guide</h4>
            <p>
              {KLinfo[this.state.actKL]}
            </p>
            </div></Col>
            </Row>
          </Container>
            </div>
    );
  }
}

export default Results;
