import React,{useState,useEffect,useContext} from 'react';
import Styles from './TaxManagement.module.css'
import services from '../../http/services';
import {TaxManagementContext} from './TaxManagement'

const AddTaxes = ({close,item}) => {
    
    const [data,setData] = useState({
        igst:0,
        cgst:0,
        sgst:0 
    })
    const {updateData} = useContext(TaxManagementContext)

    useEffect(() => {
        console.log("item",item)
        if(item){
            setData({...item})
        }
    },[item]);

    
    const submitData = async() => {
        try{
            let apiname = 'account/addTax'
            if(Object.keys(item).length===0){
                if(data.igst || data.cgst || data.sgst){
                    let result = await services.postwithoutimage(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('Added Successfully')
                        setData({igst:0,cgst:0,sgst:0})
                    }else{
                        alert(result.message)
                    }
                }else{
                    alert('All Field Empty')
                    return 
                }
            }else{
                apiname = 'account/updateTax/'+item._id
                let result = await services.put(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('Update Successfully')
                        updateData(result.data)
                        setData({igst:0,cgst:0,sgst:0})
                    }else{
                        alert(result.message)
                    }
            }
        }catch(err){
           console.log(err)
           alert(err) 
        }
    }
    

    return (
        <>
        <h3 style={{textAlign:'center',marginTop:10}}>Add Taxes</h3>
        <button className={Styles.closebtn} onClick={()=>close()}>close</button>
        <div className={Styles.addConatiner}>
            <div className={Styles.mainContainer}>
                <p className={Styles.ptext}>Enter IGST</p>
                <input type="text" placeholder='Enter IGST' className={Styles.inputText} value={data.igst} onChange={(e)=>{
                    setData(old=>{
                        return {...old,igst:e.target.value}
                    })
                }}/>
                <p className={Styles.ptext}>Enter GST</p>
                <input type="text" placeholder='Enter CGST' className={Styles.inputText} value={data.cgst} onChange={(e)=>{
                    setData(old=>{
                        return {...old,cgst:e.target.value}
                    })
                }}/>
                <p className={Styles.ptext}>Enter SGST</p>
                <input type="text" placeholder='Enter SGST' className={Styles.inputText} value={data.sgst} onChange={(e)=>{
                    setData(old=>{
                        return {...old,sgst:e.target.value}
                    })
                }}/>
                <button className={Styles.btn} onClick = {()=>submitData()}>{Object.keys(item).length === 0?"Submit":'Update'}</button>
            </div>
        </div>
        </>
    );
}

export default AddTaxes;
