import React,{useState,useEffect} from 'react';
import services from '../../http/services'
import Styles from '../faq/Faq.module.css'
import Dropdown from '../DropDown';


const AddNotification = ({close}) => {
    const [data,setData] = useState({
        title:'',
        dashBoardImages:'',
        product:'',
        subcategory:''
    })
    const [productData,setProductData] = useState([])
    const [optionalValue,setOptionalValue] = useState('')
    const [dashboardData,setdashboardData] = useState([])
    const [dashboardOptionalValue,setdashboardOptionalValue] = useState('')
    const [subData,setSubData] = useState([])
    const [supOptionalValue,setSubOptionalValue] = useState('')

    const fetchAllProduct = async() =>{
        try{
            let apiname = 'product/getDeshBoardImage'
            let subapiname = 'product/getSubCategoriesData'
            let productapiname = 'product/getAllProduct'
            let result = await services.get(apiname)
            let resultSub = await services.get(subapiname)
            let resultProduct = await services.get(productapiname)
            if(result.Status){
                let alllistproduct = result.data
                let list = alllistproduct.map(item=>{
                    return {label:item.dashboard_name,value:item._id}
                })
                setdashboardData(list)
                let data = resultProduct.data
                let productList = data.map(item=>{
                    return {label:item.productName,value:item._id}
                })
                setProductData(productList)
                data = resultSub.data
                let subList = data.map(item=>{
                    return {label:item.subcategory_name,value:item._id}
                })
                setSubData(subList)
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

    const onChangeDashBoard = (event) =>{
        setData(old=>{
            return {...old,dashBoardImages:event.value}
        })
        setdashboardOptionalValue(event)
    }
    
    const onChangeSub = (event)=>{
        setData(old=>{
            return {...old,subcategory:event.value}
        })
        setSubOptionalValue(event)
    }
    const onChangeProduct = (event) =>{
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
                    return {...old,title:'',dashBoardImages:''}
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
                    <p className={Styles.ptext}>Select dashoBoard Name</p>
                    <div className={Styles.dropdown}>
                    <Dropdown data={dashboardData} onChange={onChangeDashBoard} value={dashboardOptionalValue} defaultValue={dashboardOptionalValue}/>
                    </div>
                    <p className={Styles.ptext}>Select SubCategory Name</p>
                    <div className={Styles.dropdown}>
                    <Dropdown data={subData} onChange={onChangeSub} value={supOptionalValue} defaultValue={supOptionalValue}/>
                    </div>
                    <p className={Styles.ptext}>Select Product Name</p>
                    <div className={Styles.dropdown}>
                    <Dropdown data={productData} onChange={onChangeProduct} value={optionalValue} defaultValue={optionalValue}/>
                    </div>
                    <button className={Styles.btn} onClick={submitData}>Add </button>
                </div>
            </div>
        </>
    );
}

export default AddNotification;
