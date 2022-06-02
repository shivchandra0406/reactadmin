import React,{useState,useEffect} from 'react';
import services from '../../http/services'
import Styles from '../faq/Faq.module.css'
import Dropdown from '../DropDown';


const AddNotification = ({close}) => {
    const [data,setData] = useState({
        title:'',
        product:''
    })
    const [productData,setProductData] = useState([])
    const [optionalValue,setOptionalValue] = useState('')

    const fetchAllProduct = async() =>{
        try{
            let apiname = 'product/getAllProduct'
            let result = await services.get(apiname)
            if(result.Status){
                let alllistproduct = result.data
                let list = alllistproduct.map(item=>{
                    return {label:item.productName,value:item._id}
                })
                setProductData(list)
            }else{
                alert(result.message)
            }
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    useEffect(()=>{
        fetchAllProduct()
    },[])

    const onChange = (event) =>{
        setData(old=>{
            return {...old,product:event.value}
        })
        setOptionalValue(event)
    }

    const submitData = async() =>{
        try{
            let apiname = 'account/addNotification'
            let result = await services.postwithoutimage(apiname,data)
            if(result.Status){
                alert('Added Successfully')
                setData(old=>{
                    return {...old,title:'',product:''}
                })
                setOptionalValue('')
            }else{
                alert(result.message)
            }
        }catch(err){
            alert(err)
        }
    }
    return (
        <>
            <h3 style={{ textAlign: 'center', marginTop: 10 }}>Add Product for Notification</h3>
            <button className={Styles.closebtn} onClick={close}>close</button>
            <div className={Styles.addConatiner}>
                <div className={Styles.mainContainer}>
                    <p className={Styles.ptext}>Enter Notification Title</p>
                    <textarea placeholder='Enter Some Text ...' className={Styles.textArea} value={data.title} onChange={(e) => {
                        setData(old => {
                            return { ...old, title: e.target.value }
                        })
                    }} />
                    <p className={Styles.ptext}>Select Country</p>
                    <div className={Styles.dropdown}>
                    <Dropdown data={productData} onChange={onChange} value={optionalValue} defaultValue={optionalValue}/>
                    </div>
                    <button className={Styles.btn} onClick={submitData}>Add </button>
                </div>
            </div>
        </>
    );
}

export default AddNotification;
