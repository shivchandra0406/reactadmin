import React, { useEffect, useState } from 'react'
import Styles from './ProductTable.module.css'
import Product from './Product'
import Table from './Table'
import services from '../../http/services'
import { IoMdAdd} from 'react-icons/io';


const Product_Table = () => {

    const [data, setData] = useState([])
    const [editState,setEditState] = useState(false)
    const [singledata,setSingleData] = useState({})
    const [addProduct,setAddProduct] = useState(false)
    const [rerender,setRerender] = useState(false)
    useEffect(() => {
        let unsubscribeData = fetchData()
        // console.log("data");
        // return unsubscribeData = null
    }, [])

    useEffect(()=>{
        fetchData()
    },[rerender])

    const onChangeEdit = (item) =>{
        //console.log("onchange",item);
        setEditState(true)
        setAddProduct(false)
        setSingleData(item)
        //return
    }
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
    const back = () =>{
        setEditState(false)
        setAddProduct(false)
        setRerender(!rerender)
    }
    const fetchData = async () => {
        try {
            const apiname = "product/getAllProduct"
            //alert('data')
            const result = await services.get(apiname)
            // alert(result.Status)
            console.log("result---->", result);
            if (result.Status === true) {
                setData(result.data)
                //console.log("ser data",data);

            }
            else {
                alert(result.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {!(editState)?(<div className={Styles.tableMainContainer}>
                <h2>All Product Data</h2>
                <div className={Styles.butoonWrapper}>
                  <p style={{fontSize:16}}>search Product</p>
                  <input className={Styles.textinput} type="text" placeholder='Enter Product Name'/>
                  <button onClick={()=>{
                      setAddProduct(true)
                      setEditState(true)
                  }}
                  style={{
                    width:90,
                    height:30,
                    background:'#04b023',
                    color:'white',
                    outlineColor:'white',
                    border:0,
                    borderRadius:10
                }}><IoMdAdd color='white'/>Add</button>
                  </div>
                <div className={Styles.wraptable}>
                <div className={Styles.tableContainer}>
                <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Product Image</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Product Name</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Category Name</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>SubCategory Name</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>DashBoard Image Name</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Price</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Offer</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Total Quantity</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Origin Country</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Code</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Description</span></div>
                    <div className={Styles.table}><span style={{fontSize:18,color:'green'}}>Action</span></div>
                </div>
                {
                    data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className={Styles.tableContainer} key={item._id}>
                                <Table key={item._id} item={item} 
                                onChangeEdit={()=>{
                                    onChangeEdit(item)}} onDelete={()=>deleteProduct(item._id)}></Table>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
            </div>
        </div>):(addProduct===false && editState===true?<Product item={editState?singledata:''} back={back}/>:<Product back={back}/>)
    }
    </>
    )
}

export default Product_Table

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