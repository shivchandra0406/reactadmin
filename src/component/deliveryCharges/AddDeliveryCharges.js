import React,{useState,useEffect} from 'react';
import Styles from './DeliveryCharges.module.css'
import services from '../../http/services';
import CoutryData from '../../Data/CoutryData';
import Dropdown from '../DropDown';



const AddDeliveryCharges = ({close,item}) => {
    
    const [data,setData] = useState({
        country_name:'',
        charges:''
    })
    const [optionalData,setOptionalData] = useState(CoutryData)
    const [optionalValue,setOptionalValue] = useState('')

    useEffect(() => {
        console.log("item",item)
        if(item){
            setData({...item})
            setOptionalValue({label:item.country_name,value:item.country_name})
        }
    },[item]);

    
    const submitData = async() => {
        try{
            let apiname = 'account/addDeliveryCharges'
            if(Object.keys(item).length===0){
                //alert(data.county_name)
                if(data.country_name || data.charges){
                    let result = await services.postwithoutimage(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('Added Successfully')
                        setData({county_name:'',charges:''})
                    }else{
                        alert(result.message)
                    }
                }else{
                    alert('All Field Empty')
                    return 
                }
            }else{
                apiname = 'account/updateDeliveryCharges/'+item._id
                console.log(data.country_name);
                let result = await services.put(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('update Successfully')
                        setData({country_name:'',charges:''})
                    }else{
                        alert(result.message)
                    }
            }
        }catch(err){
           console.log(err)
           alert(err) 
        }
    }
    //onChange value start
    const onChange = (e)=>{
        setOptionalValue(e)
        setData(data=>{
            return {...data,country_name:e.value}
        })
    }
    //onChange value end

    return (
        <>
        <h3 style={{textAlign:'center',marginTop:10}}>Add Delivery Charges</h3>
        <button className={Styles.closebtn} onClick={()=>close()}>close</button>
        <div className={Styles.addConatiner}>
            <div className={Styles.mainContainer}>
                <p className={Styles.ptext}>Select Country</p>
                <Dropdown data={optionalData} onChange={onChange} value={optionalValue} defaultValue={optionalValue}/>
                <p className={Styles.ptext}>Enter Delivery Charges</p>
                <input type="text" placeholder='Enter Charges' className={Styles.inputText} value={data.charges} onChange={(e)=>{
                    setData(old=>{
                        return {...old,charges:e.target.value}
                    })
                }}/>
                <button className={Styles.btn} onClick = {()=>submitData()}>{Object.keys(item).length === 0?"Submit":'Update'}</button>
            </div>
        </div>
        </>
    );
}

export default AddDeliveryCharges;
