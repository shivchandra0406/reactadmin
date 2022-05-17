import React,{useState,useEffect} from 'react';
import services from '../../http/services';
import Styles from './order.module.css'
import Dropdown from '../DropDown';
import DateOption from '../../Date/DateOption';
import InvoiceTemplate from '../Invoice/InvoiceTemplate';
import '../neworder/NewOrder.module.css'
import { FiDownload} from 'react-icons/fi';
import BulkUploadOrderStatus from './BulkUploadOrderStatus'

import writeXlsxFile from 'write-excel-file'
import schema from './ExcelSchema'


const OrderHistory = () => {
    const [data,setData] = useState([])
    const [filterdata,setFilterdata] = useState([])
    const [invoice,setInvoice] =useState(false)
    const [invoicedata,setInvoicedata] =useState({})
    const [exportExcelFile,setExportExcelFile] = useState(false)
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

    //Download Excel start
    const downloadExcel = async() =>{
        await writeXlsxFile(data, {
            schema,
            headerStyle: {
                backgroundColor: '#eeeeee',
                fontWeight: 'bold',
                align: 'center'
              },
            fileName: 'orderhistory.xlsx'
          })
    }
    //Download Excel end

    //close btn start
    const closeBtn=()=>{
        setInvoice(false)
        setExportExcelFile(false)
    }
    //close btn end

    return (
        <>
        {!invoice?(<div className={Styles.tableMainContainer}>
                <h2 style={{color:'#3F15EA'}}>All Order History Data</h2>
                <div className={Styles.btnWrapper}>
                <Dropdown data={options} value = {optionValue} onChange = {onChange}/>
                <Dropdown data={dateOptions} value = {dateOptionValue} onChange = {onChageDate}/>
                <button className={Styles.excelbtn} onClick={()=>downloadExcel()}>Download Excel</button>  
                <button className={Styles.excelbtn} onClick={()=>{
                    setExportExcelFile(true)
                    setInvoice(true)
                }
            } style={{marginLeft:20}}>Export Excel</button>    
            </div>
            <div >
            <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }} id="table-to-xls" >
                <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow', }}>
                    <th ><p>ID</p></th>
                    <th>Customer Info</th>
                    <th>Customer Address</th>
                    <th>Product Info</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Invoice</th>
                </tr>
                {
                    data.length > 0 ? data.map(item => {
                        
                        return (
                            //setBcolor('')
                            //setBcolor('red')
            <tr key={item._id} >
                    <td><p >{item._id}</p></td>
                    <td >
                            <p>{item.user?.name}</p>
                            <p>{item.user?.email}</p>
                            <p>{item.user?.mobilenumber}</p>
                    </td>
                    <td >
                            <p>{item.user_address?.address_type}</p>
                            <p>{item.user_address?.area}</p>
                            <p>{item.user_address?.city}</p>
                            <p>{item.user_address?.pincode}</p>
                            <p>{item.user_address?.state}</p>
                    </td>
                    <td >
                            <p>{item.product?._id}</p>
                            <p>{item.product?.productName}</p>
                    </td>
                    <td >{item.qty}</td>
                    <td >{item.amount}</td>
                    <td >
                        <div>
                            <p>{item.payment_order_id?.payment_info?.razorpay_payment_id}</p>
                            <p>{item.payment_order_id?.payment_info?.razorpay_order_id}</p>
                            <p>{item.payment_order_id?.payment_info?.razorpay_signature}</p>
                        </div>
                    </td>
                    <td style={{color:'green'}}><p >{item.order_status}</p></td>
                    <td style={{color:'green'}}><p ><FiDownload color='red' size={14} width={40} height={30} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} 
                     onClick={()=>downloadPdf(item)}  
                    /></p></td>
            </tr>
            )
                    }) : <h2>No Order history</h2>
                }
        </table>

            </div>        
            </div>):!exportExcelFile && invoice?<InvoiceTemplate item={invoicedata} back={back}/>:<BulkUploadOrderStatus close={closeBtn}/>
            }
            </>
    );
}


export default OrderHistory;
