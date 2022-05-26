import React,{useState} from 'react';
import Styles from './Login.module.css'


const Login = () => {
    const [paramsData,setParamsData] = useState({
        mobilenumber:'',
        password:'',
        type:1
    })
    return (
        <>
        <p style={{float:'left',marginLeft:10,marginTop:10,fontSize:18,color:'#2B1AE5',textShadow:'3px 3px 15px #888888'}}>Welcome To Pink Box Addmin Pannel</p>
        <div className={Styles.mainContainer}> 
           <div className={Styles.loginContainer}>
            <div className={Styles.headerStyle}>
                <h3>Pink Box Login Page</h3>
            </div>
            <div className={Styles.loginboxStyle}>
                <p className={Styles.textline}>Enter MobileNumber</p>
                <input type="text" placeholder='Enter MobileNumber' className={Styles.textinput} value = {paramsData.mobilenumber} onChange={(e)=>{
                    setParamsData(old=>{
                        return {...old,mobilenumber:e.target.value}
                    })
                }}/>
                <p className={Styles.textline}>Enter Password</p>
                <input type="password" placeholder='Enter Password' className={Styles.textinput} value = {paramsData.password} onChange={(e)=>{
                    setParamsData(old=>{
                        return {...old,password:e.target.value}
                    })
                }}/>
            </div>
              <div className={Styles.forgetStyle}><p className={Styles.ptext}>Forget Password</p></div>
              <div className={Styles.buttonContainer}><button type="password" className={Styles.btnStyle}>Login</button></div>
            </div>
            
        </div>
        </>
    );
}

export default Login;
