import React from 'react'

import Styles from './order.module.css'
import { FiDownload} from 'react-icons/fi';

        
const GetTableOrderData = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    let bkground = ''
    if(item.order_status==='Orderd'){
        bkground = '#25e31b'
    }else if(item.order_status==='Dispatch'){
        bkground = '#a621db'
    }
    else if(item.order_status==='Transit'){
        bkground = '#db21c5'
    }else if(item.order_status==='Delivered'){
        bkground = '#db8a21'
    }
    let orderStyle ={
        fontSize:10,
        fontWeight:'bold',
        width:'auto',
        height:'auto',
        backgroundColor:bkground||'yellow',
        textAlign:'center',
        padding:5,
        borderRadius:10,
        color:'#fff'
    }
    
    return (
        <>
        <div className={Styles.table1}><span>{item._id}</span></div>
        <div className={Styles.table1}>
            <span className={Styles.oneRowFixData}>
                <label style={{fontSize:9,fontWeight:'bold',}}>{item.user?.name}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user?.mobilenumber}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user?.email}</label>
            </span>
        </div>
        <div className={Styles.table1}>
            <span className={Styles.oneRowFixData}>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user_address?.address_type}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user_address?.area}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user_address?.city}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user_address?.pincode}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.user_address?.state}</label>
            </span>
        </div>
        <div className={Styles.table1}>
            <span className={Styles.oneRowFixData}>
                <p style={{fontSize:9,fontWeight:'bold'}}>{item.product?._id}</p>
                <p style={{fontSize:9,fontWeight:'bold'}}>{item.product?.productName}</p>
            </span>
        </div>
        <div className={Styles.table1}>
            <p style={{fontSize:10,fontWeight:'bold'}}>{item.qty}</p>
        </div>
        <div className={Styles.table1}>
            <p style={{fontSize:10,fontWeight:'bold'}}>{item.product?.productPrice}</p>
        </div>
        <div className={Styles.table1}>
            <span className={Styles.oneRowFixData}>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.payment_order_id?.payment_info?.razorpay_payment_id}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.payment_order_id?.payment_info?.razorpay_order_id}</label>
                <label style={{fontSize:9,fontWeight:'bold'}}>{item.payment_order_id?.payment_info?.razorpay_signature}</label>
            </span>
            </div>
        <div className={Styles.table1}>
            <p style={orderStyle}>{item.order_status}</p>
        </div>
        <div className={Styles.table1}><p>
        <FiDownload color='red' size={14} width={40} height={30} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/></p>
        </div>
      </>     
    )
}

export default GetTableOrderData