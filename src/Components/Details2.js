///not ye final, see notes in whatsapp...

import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { Route, BrowserRouter as Router,Redirect } from 'react-router-dom'
import axios from 'axios';
import Cropper from 'react-easy-crop'
import ReactCrop from'react-image-crop'
import {storage} from './firebase'
/*

        <button style={{all:"unset",position:"absolute",top:"-10px",right:"-10px"}}>X</button>
        <i style={{top:"-500px"}} class="fas fa-heart"></i>

*/
import 'react-image-crop/dist/ReactCrop.css';
import styles from './styles/Details2.module.css';
import {Link, Switch} from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function allTrue(obj)
{
  for(var o in obj)
      if(obj[o]!=="green"){ return false};
  return true;
}

function MyImage(props){
    return(
        <img className={styles.step1image} src={props.source} width="120" height="120px"/>
    )
}

function Step1(props){

    return(
    <div>
    <p>Add radiograph images</p>
    <input type="file" accept="image/*" onChange={props.imagehandler} />

    {props.src && (
            <div>
            <p>Try to get center part of the X-ray</p>
          <ReactCrop
            src={props.src}
            minHeight={224}
            maxHeight={224}
            minWidth={224}
            maxWidth={224}
            crop={props.crop}
            ruleOfThirds
            onImageLoaded={props.onImageLoaded}
            onComplete={props.onCropComplete}
            onChange={props.onCropChange}
          />
          </div>
        )}
        {props.croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={props.croppedImageUrl} />
        )}
    
    
    
    <button onClick={props.addimage}>add image: {props.imagename}</button>
    {
        props.images.map((img,index)=>{
            return(
            <MyImage
            source={img.source}
            index={index}
            />
            )
        })
    }
    </div>)
}
function Step2(props){
    console.log(props.age);
    const ageclass = isNaN(props.age)||props.age>200||props.age<0? styles.borderred : styles.noneclass;
    const genderclass = props.gender==="none"? styles.borderred : styles.noneclass;
    const bmiclass = isNaN(props.bmi)||props.bmi>200||props.bmi<0? styles.borderred : styles.noneclass;
    return(
        <form>
        <p>Personal Details</p>
        <p className={styles.subtitle}>This information will only be used for prediction</p>
        <input type="text" className={ageclass} placeholder="Enter you age" name="age" onChange={props.onFormchangeHandler} value={props.age}/>
        <select className={genderclass} name="gender" value={props.gender} onChange={props.onFormchangeHandler}>this is select
      <option value="none" disabled selected>Select your gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
        <input type="text" placeholder="Enter height in cm" name="height" onChange={props.onFormchangeHandler} value={props.height}/>
        <input type="text" placeholder="Enter weight in kg" name="weight" onChange={props.onFormchangeHandler} value={props.weight}/>
        <input type="text" disabled className={bmiclass} name="bmi"  value={"BMI: "+props.bmi}/>
      </form>
    );
}

function Step3(props){
    const injuryclass = props.injury==="none"? styles.borderred : styles.noneclass;
    const surgeryclass = props.surgery==="none"? styles.borderred : styles.noneclass;
    const womacclass = isNaN(props.womac)||props.womac>240||props.age<0? styles.borderred : styles.noneclass;
    const klclass = isNaN(props.currentKnownKL)||props.currentKnownKL>5||props.age<0? styles.borderred : styles.noneclass;


    return(
        <form>
        <p>Medical Details</p>
        <p className={styles.subtitle}>This information is securely handled</p>
         <select name="injury" className={injuryclass} value={props.injury} onChange={props.onFormchangeHandler}>this is select
      <option value="none" disabled selected>Have you had any of these injuries?</option>
      <option value="Sprains">Sprains</option>
      <option value="Swollen muscles">Swollen muscles</option>
      <option value="Dislocation">Dislocations</option>
      <option value="None">None</option>
    </select>
  
      <select name="surgery" className={surgeryclass} value={props.surgery} onChange={props.onFormchangeHandler}>this is select
      <option value="none" disabled selected>Have you had any of these surgeries?</option>
      <option value="Heart Bypass surgery">Heart Bypass surgery</option>
      <option value="Weigth loss surgery">Weigth loss surgery</option>
      <option value="Hip replacement">Hip replacement</option>
      <option value="None">None</option>
    </select>
    <input type="text" className={womacclass} name="womac" placeholder="Whats your WOMAC index?(0-240)" value={props.womac} onChange={props.onFormchangeHandler} />
    <label><a href="https://www.physio-pedia.com/WOMAC_Osteoarthritis_Index">What's WOMAC? Know more</a></label>
    <input type="text" className={klclass} name="currentKnownKL" placeholder="Enter current Known KL" value={props.currentKnownKL} onChange={props.onFormchangeHandler} />
      </form>
    );
}



class Details2 extends Component {
  constructor(props){
    super(props);
    this.state = {
        age:"",gender:"none",bmi:"",height:null,weight:null,injury:"none",surgery:"none",womac:"",currentKnownKL:"",currentstep:1,
        images:[],imgcount:0,selectedimages:[],thissrc:null,imagename:"",
        colormarkers:{step1:"grey",step2:"grey",step3:"grey"},
        src: null,
        croppedImageUrl:null,
    crop: {
      unit: 'px',
      width: 224,
      height:224
    },
        v1:false,v2:false,v3:false,
        // color_age,color_gender,color_bmi,color_injury,color_surgery,
    }
    this.onFormchangeHandler=this.onFormchangeHandler.bind(this);
    this.onnextHandler=this.onnextHandler.bind(this);
    this.onpreviousHandler=this.onpreviousHandler.bind(this);
    this.onsubmitHandler=this.onsubmitHandler.bind(this);
    this.ondirectstep=this.ondirectstep.bind(this);
    this.imagehandler=this.imagehandler.bind(this);
    this.addimage=this.addimage.bind(this);
    this.onSubmitDetails=this.onSubmitDetails.bind(this);
}



onSubmitDetails(e){

    if(this.state.colormarkers.step1==="green"&&this.state.colormarkers.step2==="green"&&this.state.colormarkers.step3==="green")
    {
    let thisdetails={personal:{age:this.state.age,bmi:this.state.bmi,gender:this.state.gender},
    medical:{injury:this.state.injury,surgery:this.state.surgery,womac:this.state.womac,currentKnownKL:this.state.currentKnownKL}
    }
    console.log("starting image upload");
    let imageid="";
    axios.post("http://localhost:3001/imageupload")
    .then(res=>{
        imageid=res.data.thisid;
        console.log(imageid);

        let image=this.state.images[0].image;
        var blob = new Blob([image], { type: "image/jpeg" });
        //console.log(this.state.croppedImageUrl);
        storage.ref(`${imageid}`).put(blob)
        .then(snapshot=>{
        console.log(snapshot);
        thisdetails.imageid=imageid;

            
        console.log("sending whole data");
        axios.post("http://localhost:3001/adddetails",{details:thisdetails}).
        then(res=>{
            this.setState({message:res.data});
        });
        this.setState({
            message:"successfully saved, Redirecting..."
        })
    });
    })
    }
    else{
        this.setState({message:"Please Check all details"});
    }

    e.preventDefault();
}


// onCropChange = crop => {
//     this.setState({ crop })
//   }

//   onCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels)
//   }

//   onZoomChange = zoom => {
//     this.setState({ zoom })
//   }

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
      console.log(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }









/////
////



imagehandler(event){
        console.log("image handler called");
         let thissource = URL.createObjectURL(event.target.files[0]);
         console.log(thissource);
         //console.log(event.target.files[0]);
         //this.setState({src:thissource});
        this.setState({selectedimages: event.target.files,src:thissource,thissrc:thissource,imagename:event.target.files[0].name},()=>{
        console.log("image loaded in selected image");
        console.log(this.state);
        }); 

        event.preventDefault();
}

addimage(e){
    let currentimages=this.state.selectedimages;
    console.log(currentimages);
    //fconsole.log(currentimages[2]);
    let imgs=this.state.images;

    ///
    
    ///
    for(var i=0;i<currentimages.length;i++)
    {
        imgs[this.state.imgcount+i]={image:currentimages[i],source:this.state.croppedImageUrl}
        //source:URL.createObjectURL(currentimages[i])
    }
    this.setState({
        images:imgs,imgcount:this.state.imgcount+i,imagename:"",src:null,croppedImageUrl:null
    },()=>{
    console.log(this.state);
    this.setState({
        colormarkers: {
            ...this.state.colormarkers,
            step1: 'green'
      }
    })
})
    console.log(i);
    e.preventDefault();
}

ondirectstep = (thisstep) => {
    
    this.setState({currentstep:thisstep},()=>{
        this.setState({
            v1:true
        })
        if(this.state.currentstep===2){
            this.setState({
                v2:true
            })
        }else if(this.state.currentstep===3){
            this.setState({
                v3:true
            })
        }
    })
}

onnextHandler(e){
    
    if(this.state.currentstep!==3){
        this.setState({currentstep:this.state.currentstep+1},()=>{

            if(this.state.currentstep===2){
                this.setState({v1:true,v2:true})
            }
            else if(this.state.currentstep==3){
                this.setState({v3:true,v2:true})
            }
        });
    }
    e.preventDefault();

}

onpreviousHandler(e){
    
    if(this.state.currentstep!==1){
        this.setState({currentstep:this.state.currentstep-1},()=>{
            if(this.state.currentstep===2){
                this.setState({v2:true,v3:true})
            }
            else if(this.state.currentstep==1){
                this.setState({v1:true,v2:true})
            }
        });
    }
    e.preventDefault();
}

onsubmitHandler(e){
    e.preventDefault();
}

onFormchangeHandler(e){

    
    const name=e.target.name;
    const value=e.target.value;
    //console.log(name);
    //console.log(sname);
    if(value===null||value===""){
        this.setState({message:name+" cannot be empty"});
        toast.error(name+" cannot be empty", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });    }
    
    this.setState({
        [name]:value
    },()=>{
        console.log(this.state);
        if(name==="height"||name==="weight"){
            console.log(parseFloat(this.state.height)/100*parseFloat(this.state.height)/100);
            console.log(parseFloat(this.state.weight))
            let bmi=(parseFloat(this.state.weight)/(parseFloat(this.state.height)/100*parseFloat(this.state.height)/100));
            this.setState({bmi:bmi});
        }


        /// here we validate inputs

        if(this.state.v2){
            //console.log(isNaN(this.state.bmi))
            if(this.state.age===""||this.state.bmi===""||this.state.age===null||this.state.gender==="none"
            ||this.state.gender===null||this.state.bmi===null||isNaN(this.state.age)||isNaN(this.state.bmi)){
                this.setState({
                    colormarkers: {
                        ...this.state.colormarkers,
                        step2: 'red'
                  }
                },()=>{console.log(this.state);})
            }
            else{
                this.setState({
                    colormarkers: {
                        ...this.state.colormarkers,
                        step2: 'green'
                  }
                })
            }
            }
        
            if(this.state.v3){
            if(this.state.injury==="none"||this.state.surgery==="none"||isNaN(this.state.womac)
            ||(this.state.womac!==null&&this.state.womac>240)||(this.state.currentKnownKL<0)||this.state.currentKnownKL>5||isNaN(this.state.currentKnownKL)){
                this.setState({
                    colormarkers: {
                        ...this.state.colormarkers,
                        step3: 'red'
                  }
                })
            }
            else{
                this.setState({
                    colormarkers: {
                        ...this.state.colormarkers,
                        step3: 'green'
                  }
                })
            }
            }
        
    })

    
    




e.preventDefault();

}

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    let s1="";
    let s2="";
    let s3="";
    //console.log(this.state.currentstep);
    switch(this.state.currentstep){
    case 1: s1=<Step1
                images={this.state.images}
                imagehandler={this.imagehandler}
                addimage={this.addimage}
                imagename={this.state.imagename}
                src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onCropComplete={this.onCropComplete}
            onCropChange={this.onCropChange} 
            croppedImageUrl={croppedImageUrl}             />;
            s2="";
            s3="";break;
    case 2: s1=""
            s2=<Step2
                age={this.state.age}
                gender={this.state.gender}
                bmi={this.state.bmi}
                height={this.state.height}
                weight={this.state.weight}
                onFormchangeHandler={this.onFormchangeHandler}
                />;
            s3="";break;
    case 3: s1="";
            s2="";
            s3=<Step3
                injury={this.state.injury}
                surgery={this.state.surgery}
                womac={this.state.womac}
                currentKnownKL={this.state.currentKnownKL}
                onFormchangeHandler={this.onFormchangeHandler}
                />
    default: 
    }

    let c1=this.state.colormarkers.step1;
    let c2=this.state.colormarkers.step2;
    let c3=this.state.colormarkers.step3;

    let b1="";
    switch(c1){
        case "red": b1=<button className={styles.circlered} onClick={()=>{this.ondirectstep(1)}}>1</button>
        break;
        case "green": b1=<button className={styles.circlegreen} onClick={()=>{this.ondirectstep(1)}}>1</button>
        break;
        default: b1=<button className={styles.circle} onClick={()=>{this.ondirectstep(1)}}>1</button>
    }
    let b2="";
    switch(c2){
        case "red": b2=<button className={styles.circlered} onClick={()=>{this.ondirectstep(2)}}>2</button>
        break;
        case "green": b2=<button className={styles.circlegreen} onClick={()=>{this.ondirectstep(2)}}>2</button>
        break;
        default: b2=<button className={styles.circle} onClick={()=>{this.ondirectstep(2)}}>2</button>
    }
    let b3="";
    switch(c3){
        case "red": b3=<button className={styles.circlered} onClick={()=>{this.ondirectstep(3)}}>3</button>
        break;
        case "green": b3=<button className={styles.circlegreen} onClick={()=>{this.ondirectstep(3)}}>3</button>
        break;
        default: b3=<button className={styles.circle} onClick={()=>{this.ondirectstep(3)}}>3</button>
    }

    let submitstyle=styles.submitdetails;
    if(allTrue(this.state.colormarkers)){
        submitstyle=styles.submitdetailsgreen
    }

    let buttoncolornext="";
    let buttoncolorprev="";
    if(this.state.currentstep==1){
        buttoncolorprev=styles.greybutton
        console.log("checking color button");
    }
    if(this.state.currentstep==3){
        buttoncolornext=styles.greybutton
    }
    return(
        <div className={styles.detailsbody}>
            <div className={styles.uppernav}>
                {b1}
                {b2}
                {b3}
            </div>
            <form className={styles.detailform}>
            {s1}
            {s2}
            {s3}
        <button onClick={this.onpreviousHandler} className={buttoncolorprev} >Previous</button>
        <button onClick={this.onnextHandler} className={buttoncolornext}>Next</button>
        </form>
        <button className={submitstyle} onClick={this.onSubmitDetails}>Submit</button>
        <Link to="./results"><button className={submitstyle}>Go</button></Link>
        <label style={{display:"block"}}>{this.state.message}</label>
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
export default Details2;
