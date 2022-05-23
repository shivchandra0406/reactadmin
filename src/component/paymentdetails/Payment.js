import React,{useState,useEffect} from 'react';
import Styles from './PaymentDetail.module.css'
import '../neworder/NewOrder.module.css'
import services from '../../http/services';
import Moment from 'react-moment';
import DateOption from '../../Date/DateOption';
import Dropdown from '../DropDown';

const Payment = () => {
    const [data,setData] = useState([])
    const [filterdata,setFilterData] = useState([])
    const [dateOptions,setDateOptions] = useState([
        {label:'Select',value:''},{label:'24 Hours',value:'24 Hours'},
        {label:'Yesterday',value:'Yesterday'},{label:'Last 3 days',value:'Last 3 days'},
        {label:'last Week',value:'last Week'},{label:'last 1 Month',value:'last 1 Month'},
        {label:'last 6 Month',value:'last 6 Month'},{label:'last 1 Year',value:'last 1 Year'}   
    ])
    const [dateOptionValue,setDateOptionValue] = useState('')

    const onChageDate = (e)=>{
        //console.log(e)
        setDateOptionValue(e)
    }

        //filtering data by Order
        const filteringData = () =>{
            if(dateOptionValue.value === ''){
                setData(filterdata)
            }else{
                setData(filterdata.filter((item)=>{
                    //console.log(dateOptionValue.value,dateOptionValue==='')
                    if(dateOptionValue == '' || dateOptionValue.value ==='All Data' ){
                        return item
                    }else if(dateOptionValue.value==='24 Hours'){
                        return item.createdAt>DateOption.now().toISOString() 
                    }else if(dateOptionValue.value==='Yesterday'){
                        return item.createdAt>DateOption.beforDays().toISOString() 
                    }else if(dateOptionValue.value==='Last 3 days'){
                        //console.log(item);
                        return item.createdAt>DateOption.threeDays().toISOString() 
                    }
                    else if(dateOptionValue.value==='last Week'){
                        return (item.createdAt>DateOption.sevenDays().toISOString()) 
                    }
                    else if(dateOptionValue.value==='last 1 Month'){
                        return item.createdAt>DateOption.oneMonth().toISOString()
                    }
                    else if(dateOptionValue.value==='last 6 Month'){
                        return item.createdAt>DateOption.sixMonth().toISOString()
                        
                    }else if(dateOptionValue.value==='last 1 Year'){
                        return item.createdAt>DateOption.oneYear().toISOString() 
                    }
                }
                ))
            }
        }
        //filtering data by date

    useEffect(()=>{
        filteringData()
    },[dateOptionValue])

    const fetchData = async(req,res) =>{
        try{
            let apiname = 'product/getPaymentDetails'
            let result = await services.get(apiname)
            console.log(result);
            if(result.Status===true){
                setData(result.data)
                setFilterData(result.data)
            }else{
                alert(result.message)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div className={Styles.container}>
            <h2> All Payment Details </h2>
            <div className={Styles.filtercontainer}>
              <p style={{fontSize:14,color:'GrayText',marginRight:10}}>Search Payment Details with user name and paymentId</p>
              <input type="text" className={Styles.searchtxt} placeholder="Type here...." />
              <Dropdown data={dateOptions} value = {dateOptionValue} onChange = {onChageDate}/>
              </div>
            <div className={Styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow'}}>
                  <th>Id</th>
                  <th>Coustomer Name</th>
                  <th>Order Date</th>
                  <th>Total Quantity</th>
                  <th>Total amount</th>
                  <th>Payment Method</th>
                  <th>Payment Info</th>
                </tr>
                {
                    data.length>0?data.map(item=>{
                        return <tr>
                            <th>{item._id}</th>
                            <th>{item.user?.name}</th>
                            <th><Moment format='DD/MM/YYYY'>{item.createdAt}</Moment></th>
                            <th>{item.total_item}</th>
                            <th style={{letterSpacing:1}}>{item.totalamount}</th>
                            <th>{item.payment_method}</th>
                            <th>{item.payment_info?.razorpay_payment_id}</th>
                        </tr>
                    }):<h3>No Any Payment Details</h3>
                }
            </table>
            </div>
        </div>
    );
}

export default Payment;
