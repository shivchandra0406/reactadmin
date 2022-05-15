import React,{useState,useEffect} from 'react';
import services from '../../http/services';
import Styles from './order.module.css'
import GetTableOrderData from './GetTableOrderData';
import Dropdown from '../DropDown';
import DateOption from '../../Date/DateOption';
import InvoiceTemplate from '../Invoice/InvoiceTemplate';

const OrderHistory = () => {
    const [data,setData] = useState([])
    const [filterdata,setFilterdata] = useState([])
    const [invoice,setInvoice] =useState(false)
    const [invoicedata,setInvoicedata] =useState({})
    const [options,setOptions] = useState([
        {label:'Select',value:''},
        {label:'Orderd',value:'Orderd'},{label:'Dispatch',value:'Dispatch'},
        {label:'Transit',value:'Transit'},{label:'Delivered',value:'Delivered'}
    ])
    const [dateOptions,setDateOptions] = useState([
        {label:'Select',value:'All Data'},{label:'24 Hours',value:'24 Hours'},
        {label:'Yesterday',value:'Yesterday'},{label:'Last 3 days',value:'Last 3 days'},
        {label:'last Week',value:'last Week'},{label:'last 1 Month',value:'last 1 Month'},
        {label:'last 6 Month',value:'last 6 Month'},{label:'last 1 Year',value:'last 1 Year'}   
    ])
    const [optionValue,setOptionValue] = useState('')
    const [dateOptionValue,setDateOptionValue] = useState('')
    const onChange = (e) =>{
        console.log(e);
        setOptionValue(e)
    }
    const onChageDate = (e)=>{
        setDateOptionValue(e)
    }
    const fetchData = async()=>{
        const apiname = 'product/getAllOrder'
        try{
            const result = await services.get(apiname)
            if(result.Status===true){
                console.log(result);
                setData(result.data)
                setFilterdata(result.data)
            }else{
                alert(result.message)
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{  
        fetchData()
    },[])
    useEffect(()=>{
        console.log("option value",optionValue);
        filteringData()
    },[optionValue])
    useEffect(()=>{
        filterDataByDate()
    },[dateOptionValue])

    //filtering data by Order
    const filteringData = () =>{
        if(optionValue.value === ''){
            setData(filterdata)
        }else{
            setData(filterdata.filter(item=>item.order_status===optionValue.value))
        }
    }
    //filtering data by date
    const filterDataByDate=()=>{
        if(dateOptionValue.value==='All Data'){
            setData(filterdata)
        }
        else{
            setData(filterdata.filter(item=>{
                if(dateOptionValue.value==='24 Hours'){
                    //console.log(DateOption.now(),item.createdAt);
                    //console.log("item.createdAt",item.createdAt,DateOption.now().toDateString());
                    if(item.createdAt>DateOption.now().toISOString())
                        return item
                }else if(dateOptionValue.value==='Yesterday'){
                    return item.createdAt>DateOption.beforDays().toISOString()
                }else if(dateOptionValue.value==='Last 3 days'){
                    //console.log(item);
                    return item.createdAt>DateOption.threeDays().toISOString()
                }
                else if(dateOptionValue.value==='last Week'){
                    return item.createdAt>DateOption.sevenDays().toISOString()
                }
                else if(dateOptionValue.value==='last 1 Month'){
                    return item.createdAt>DateOption.oneMonth().toISOString()
                }
                else if(dateOptionValue.value==='last 6 Month'){
                    return item.createdAt>DateOption.sixMonth().toISOString()
                    
                }else if(dateOptionValue.value==='last 1 Year'){
                    return item.createdAt>DateOption.oneYear().toISOString()
                }
            }))
        }
    }

    //download pdf start
    const downloadPdf=(item)=>{
        setInvoice(true)
        setInvoicedata(item)
            
    }
    //download pdf end

    //back fuction start
    const back = () =>{
        setInvoice(false)
        setInvoicedata({})
    }
    //back function end

    return (
        <>
        {!invoice?(<div className={Styles.tableMainContainer}>
                <h2 style={{color:'#3F15EA'}}>All Order History Data</h2>
                <div className={Styles.btnWrapper}>
                <Dropdown data={options} value = {optionValue} onChange = {onChange}/>
                <Dropdown data={dateOptions} value = {dateOptionValue} onChange = {onChageDate}/>
            </div>
                <div className={Styles.tableContainer}>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>ID</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Customer Info</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Coustomer Address</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Product Info</span></div> 
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Quantity</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Price</span></div> 
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Payment</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Order Status</span></div>
                    <div className={Styles.table}><span style={{fontSize:12,color:'green'}}>Invoice</span></div> 
                    </div>
                {
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className={Styles.tableContainer} key={item._id}>
                                <GetTableOrderData key={item._id} item={item} onChangeEdit ={()=>downloadPdf(item)} />
                            </div>
                        )
                    }) : <h2>No Any Order Data</h2>
                }
                </div>):<InvoiceTemplate item={invoicedata} back={back}/>
            }
            </>
    );
}


export default OrderHistory;
