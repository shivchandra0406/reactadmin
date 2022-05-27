import React,{useState,useEffect} from 'react';
import Styles from './Faq.module.css'
import services from '../../http/services';

const AddFaq = ({close,item}) => {
    
    const [data,setData] = useState({
        question:'',
        answer:''
    })
  
    useEffect(() => {
        console.log("item",item)
        if(item){
            setData({...item})
        }
    },[item]);

    
    const submitData = async() => {
        try{
            let apiname = 'account/addFaq'
            if(Object.keys(item).length===0){
                //alert(data.county_name)
                if(data.question || data.answer){
                    let result = await services.postwithoutimage(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('Added Successfully')
                        setData({question:'',answer:''})
                    }else{
                        alert(result.message)
                    }
                }else{
                    alert('All Field Empty')
                    return 
                }
            }else{
                apiname = 'account/updateFaq/'+item._id
                console.log(data.country_name);
                let result = await services.put(apiname,data)
                    console.log(result);
                    if(result.Status){
                        alert('update Successfully')
                        setData({question:'',answer:''})
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
        <h3 style={{textAlign:'center',marginTop:10}}>Add FAQ</h3>
        <button className={Styles.closebtn} onClick={()=>close()}>close</button>
        <div className={Styles.addConatiner}>
            <div className={Styles.mainContainer}>
                <p className={Styles.ptext}>Enter Question</p>
                <input type="text" placeholder='Enter Question' className={Styles.inputText} value={data.question} onChange={(e)=>{
                    setData(old=>{
                        return {...old,question:e.target.value}
                    })
                }}/>
                <p className={Styles.ptext}>Enter Answer</p>
                <textarea type="text" placeholder='Enter Address.....' className={Styles.textArea} value={data.answer} onChange={(e)=>{
                    setData(old=>{
                        return {...old,answer:e.target.value}
                    })
                }}/>
                <button className={Styles.btn} onClick = {()=>submitData()}>{Object.keys(item).length === 0?"Submit":'Update'}</button>
            </div>
        </div>
        </>
    );
}

export default AddFaq;
