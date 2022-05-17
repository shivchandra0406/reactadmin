import React, { useState, useEffect } from 'react';
import services from '../../http/services'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { toExcel } from 'to-excel'; 
import writeXlsxFile from 'write-excel-file'
import './NewOrder.module.css'

const NewOrder = () => {
    const [data, setData] = useState([])
    const [bcolor,setBcolor] = useState('red')

    const schema = [
        // Column #1
        {
          column: 'Id',
          type: String,
          value: item => item._id
        },
        // Column #2
        {
          column: 'Customer Name',
          type: String,
          value: item => item.user.name
        },
        // Column #3
        {
          column: 'Address',
          type: String,
          //format: '#,##0.00'
          value: item => item.user_address.area
        },
        // Column #4
        {
          column: 'Product Name',
          type: String,
          color:'#2b64d6',
          value: item => item.product.productName
         
        }
      ]
    const fetchData = async () => {
        const apiname = 'product/getAllOrder'
        try {
            const result = await services.get(apiname)
            if (result.Status === true) {
                console.log(result);
                setData(result.data)
                //setFilterdata(result.data)
            } else {
                alert(result.message)
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    var headers = [
        { label: 'ID', field: '_id' },
        { label: 'CustomerName', field: 'user.name' },
        { label: 'Address', field: 'user_address.address_type' },
        { label: 'productNmae', field: 'product.productName' },
        { label: 'Quantity', field: 'qty' },
        { label: 'Amount', field: 'amount' },
        { label: 'Payment Details', field: 'payment_order_id.payment_info.razorpay_payment_id' },
        { label: 'Order_Status', field: 'order_status' },
    ]

    //var content = toExcel.exportXLS( headers, data, 'filename' );
    const importExecl = async() =>{
        //toExcel.exportXLS( headers, data, 'orderhistory' )
        console.log("shivchand")
        await writeXlsxFile(data, {
            schema,
            fileName: 'file123.xlsx'
          })
    }

    return (
        <div className={'table_container'}>
        <ReactHTMLTableToExcel
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="Sheet"
        buttonText="Download as XLS"/>
        <button onClick={()=>importExecl()}>import order</button>
            <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }} id='table-to-xls'>
                <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow', }}>
                    <th ><p>ID</p></th>
                    <th>Customer Info</th>
                    <th>Customer Address</th>
                    <th>Product Info</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Order Status</th>
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

                    </td>
                    <td >
                            <p>{item.user_address?.address_type}</p>
                            
                    </td>
                    <td >
                            <p>{item.product?.productName}</p>
                    </td>
                    <td >{item.qty}</td>
                    <td >{item.amount}</td>
                    <td >
                            <p>{item.payment_order_id?.payment_info?.razorpay_payment_id}</p>

                    </td>
                    <td style={{color:orderStatus(item)}}><p >{item.order_status}</p></td>
            </tr>
            )
                    }) : <h2>No Order history</h2>
                }
        </table>
        </div >
    );
}


const orderStatus = (item)=>{
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
    return bkground
    
}

export default NewOrder;
