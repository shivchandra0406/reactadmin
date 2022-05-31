import React,{useState,} from 'react';
import services from '../../http/services';
import Styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import {useRedirect} from 'react-admin'


const Login = () => {
    const navigate = useRedirect()
    const [paramsData,setParamsData] = useState({
        mobilenumber:'',
        password:'',
        type:"1"
    })

    const submitData = async() =>{
        try{
            let apiname = 'account/adminLogin'
            if(paramsData.mobilenumber && paramsData.password){
                let result = await services.postwithoutimage(apiname,paramsData)
                if(result.Status){
                    alert(result.message)
                    setParamsData({mobilenumber:'',password:'',type:1})
                    localStorage.setItem('@username',JSON.stringify(result.data))
                    //console.log(localStorage.getItem('@logingDetails'));
                    navigate('/')
                }else{
                    alert(result.message)
                }
            }else{
                alert('All Filed Required Field')
            }
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
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
              <div className={Styles.buttonContainer}><button type="password" className={Styles.btnStyle} onClick={submitData}>Login</button></div>
            </div>
            
        </div>
        </>
    );
}

export default Login;
