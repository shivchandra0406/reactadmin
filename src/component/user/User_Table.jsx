import React, { useEffect, useRef, useState } from 'react'
import Styles from './User.module.css'

import Table1 from './Table1'
import services from '../../http/services'
import Dropdown from '../DropDown';


const User_Table = () => {

    const [data, setData] = useState([])
    const [allData,setAllData] = useState([])
    const searchparam = useRef('')
    const [filterdata,setFilterdata] = useState([])
    const limitdata = 20
    let [totalPage,setTotalPage] = useState(0)
    const [page,setPage] = useState(0)
    const [options,setOptions] = useState([])
    const [optionValue,setOptionValue] = useState('')
    //const [page,setPage] = useState(0)
    useEffect(() => {
        let unsubscribeData = fetchData()
        // console.log("data");
        // return unsubscribeData = null
    }, [])

    //chnaging page run useEffect 
    useEffect(()=>{
        let start = limitdata*page,end=(limitdata*page)+limitdata
        let slicedata = allData.slice(start,end)
        setData(slicedata)
        setFilterdata(slicedata)
    },[page])

    //delete product
    const deleteProduct=async(id)=>{
        var proceed = window.confirm("Are you sure you want to delete Product?");
        if(proceed){
            let apiname = `product/deleteProduct/${id}`
            let result = await services.delete(apiname)
            console.log(result);
            if(result.Status){
                alert(result.message)
                setData(data.filter(item=>item._id!==id))
            }else{
                alert(result.message) 
            }
        }
    }

    const designSelector = (allItem) =>{
        let len = allItem.length
        let div = len/limitdata,t
        //console.log("div",div);
        if(Number.isInteger(div))
        { 
            t=div-1
            setTotalPage(div-1)
        }
        else{
            t=Math.floor(div+1)
            setTotalPage(t)
        }
        console.log(totalPage);
        let optiondata = []
        for (let i=0;i<t;i++){
            optiondata.push({label:`page ${i}`,value:i})
        }
        setOptions(optiondata)
    }

    const fetchData = async (event) => {
        try {
            let page = !event?0:event.selected
            const apiname = "account/getUserDetails"
            //alert('data')
            const result = await services.get(apiname)
            // alert(result.Status)
            console.log("result---->", result);
            if (result.Status === true) {
                setAllData(result.data)
                let slicedata = result.data.slice(page,limitdata)
                setData(slicedata)
                setFilterdata(slicedata)
                designSelector(result.data)
                //console.log("ser data",data);
            }
            else {
                alert(result.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const filterFunction = () =>{
        if(searchparam.current.value===''){
            setData(filterdata)
        }else{
           setData(data.filter(item=>{
               if(item.name.toLowerCase().includes(searchparam.current.value.toLowerCase())||
                item.email.toLowerCase().includes(searchparam.current.value.toLowerCase())
               ){
                   return item
               }
           })) 
        }
    }

    const onChange = (event) =>{
        setOptionValue(event)
        setPage(event.value)
    }

    return (
        <>
            <div className={Styles.tableMainContainer}>
                <h2>All UserDetails</h2>
                <div className={Styles.SearchContainer}>
                  <p style={{fontSize:16,marginRight:10,marginTop:5}}>search user</p>
                  <input ref={searchparam} className={Styles.textinput} type="text" placeholder='Enter user Name' onChange={filterFunction}/>
                   <button className={Styles.paginationbtn} onClick={()=>{
                       console.log("previous",page);
                       if(page==0){
                           return
                       }else{
                           setPage(page-1)
                       }
                   }}>{"< previous"}</button>
                   <Dropdown value={optionValue} data={options} onChange={onChange} />
                   <button className={Styles.paginationbtn} onClick={()=>{
                    if(page<totalPage)   
                        setPage(page+1)
                       console.log(page,totalPage);
                   }}>{"Next >"}</button>
                  </div>
                <div className={Styles.wraptable}>
                <div className={Styles.tableContainer}>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Account ID</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Name</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Email</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>MobileNumber</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Dob</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Profile_image</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Created Account</p></div>
                    <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Action</p></div>
                </div>
                {
                    data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className={Styles.tableContainer} key={item._id}>
                                <Table1 key={item._id} item={item} 
                                onDelete={()=>deleteProduct(item._id)}></Table1>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
            </div>
        </div>
    </>
    )
}

export default User_Table

// import React from "react"
// import { List, Datagrid, TextField,ReferenceField} from 'react-admin';
// import { TableData } from '../../Data/TableData'

// export const Product_Table = () => (

//     <List >
//         {
//         TableData.map((item)=>{
//          return(
//             <Datagrid >
//                 <ReferenceField>
//                   <TextField source="_id" reference={TableData} />
//                 </ReferenceField>
//                 <TextField source="productName"  />
//                 <TextField source="category.category_name" />
//                 <TextField source="subCategory.subcategory_name" />
//                 <TextField source="dashboard_img.dashboard_name"  />
//                 <TextField source="productPrice" value={item.productPrice}/>
//                 <TextField source="productOffer" value={item.productOffer}/>
//                 <TextField source="productQty" value={item.productQty} />
//                 <TextField source="productOriginCountry" value={item.productOriginCountry} />
//                 <TextField source="productCode" value={item.productCode}/>
//                 <TextField source="productDescription" value={item.productDescription}/>
//             </Datagrid>
//          )
//         })
//         }
//     </List>
// );