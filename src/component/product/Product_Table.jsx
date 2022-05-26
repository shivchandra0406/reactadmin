import React, { useEffect, useRef, useState } from 'react'
import Styles from './ProductTable.module.css'
import Product from './Product'
import services from '../../http/services'
import { IoMdAdd} from 'react-icons/io';
import '../neworder/NewOrder.module.css'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
import Dropdown from '../DropDown';
import ReactLoading from 'react-loading';



// <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Bullet Point1</p></div>
// <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Bullet Point2</p></div>
// <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Bullet Point3</p></div>
// <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Bullet Point4</p></div>
// <div className={Styles.table}><p style={{fontSize:10,color:'green'}}>Bullet Point5</p></div>

const Product_Table = () => {
    const [allData,setAllData] = useState([])
    const [data, setData] = useState([])
    const [editState,setEditState] = useState(false)
    const [singledata,setSingleData] = useState({})
    const [addProduct,setAddProduct] = useState(false)
    const [rerender,setRerender] = useState(false)
    const searchparam = useRef('')
    const [filterdata,setFilterdata] = useState([])
    const limitdata = 15
    let [totalPage,setTotalPage] = useState(0)
    const [page,setPage] = useState(0)
    const [options,setOptions] = useState([])
    const [optionValue,setOptionValue] = useState('')
    const [loading,setLoading] = useState(0)
    
    useEffect(() => {
        fetchData()
        // console.log("data");
        // return unsubscribeData = null
    }, [])

    useEffect(()=>{
        setLoading(true)
        fetchData()
    },[rerender])
     
    //chnaging page run useEffect 
     useEffect(()=>{
        let start = limitdata*page,end=(limitdata*page)+limitdata
        let slicedata = allData.slice(start,end)
        setData(slicedata)
        setFilterdata(slicedata)
    },[page])
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
    
    const onChange = (event) =>{
        setOptionValue(event)
        setPage(event.value)
    }

    const fetchData = async () => {
        try {
            const apiname = "product/getAllProduct"
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
                setLoading(false)
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
               if(item.productName.toLowerCase().includes(searchparam.current.value.toLowerCase())||
                item.category?.category_name.toLowerCase().includes(searchparam.current.value.toLowerCase())
               ){
                   return item
               }
           })) 
        }
    }

    return (
        <>
            {!(editState)?(<div className={Styles.tableMainContainer}>
                <h2>All Product Data</h2>
                <div className={Styles.butoonWrapper}>
                  <p style={{fontSize:16}}>search Product</p>
                  <input ref={searchparam} className={Styles.textinput} type="text" placeholder='Enter Product Name' onChange={filterFunction}/>
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
                  <button className={Styles.paginationbtn} onClick={()=>{
                    console.log("previous",page);
                    if(page==0){
                        return
                    }else{
                        setPage(page-1)
                    }
                }}>{"<"} Previous</button>
                  <Dropdown value={optionValue} data={options} onChange={onChange} />
                  <button className={Styles.paginationbtn} onClick={()=>{
                    if(page<totalPage)   
                        setPage(page+1)
                       console.log(page,totalPage);
                   }}>Next {">"} </button>
                  </div>
                <div className={Styles.wraptable}>
                <table style={{ width: '100%',borderCollapse: 'collapse', rowGap: 1,overflowX:'scroll',overflowY:'scroll',height:'100%' }}>
                <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow', }}>
                      <th>ID</th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Category Name</th>
                      <th>SubCaegory Name</th>
                      <th>DashBoard Img Name</th>
                      <th>Material Name</th>
                      <th>Price</th>
                      <th style={{width:80}}>Action</th>
                   </tr>
                {
                    !loading?data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        let img='';
                        if(item.productImage?.length>0){
                            let image = item.productImage[0]?.productImage
                            image = image.split('/')
                            img = image[image.length-1]
                        }
                        return (
                            <tr key={index}>
                                <td>{item?item._id:''}</td>
                                <td><img src={img?"http://51.15.201.39:3002/PinkBox/Sharp/Product/"+img:''} alt="image" style={{width:90,height:25}}/></td>
                                <td style={{textOverflow:'ellipsis'}}>{item.productName} </td>
                                <td>{item.category?.category_name}</td>
                                <td>{item.subCategory?.subcategory_name}</td>
                                <td>{item.dashboard_img?.dashboard_name}</td>
                                <td>{item.material?.material_type_name}</td>
                                <td>{item.productPrice}</td>
                                <td><AiFillEdit color='red' size={14} width={30} height={20} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} onClick={
                                   ()=>onChangeEdit(item)}/>
                                <AiFillDelete color='red' size={14} width={30} height={20}  style={{ padding:5,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={()=>deleteProduct(item._id)}/></td>
                            </tr>   
                        )
                    }) : <h2>No Any Product Data</h2>:<ReactLoading type={'bubbles'} color={'green'} height={40} width={150} /> 
                }
            </table>
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
//                 <TextField source="productOriginCountry" value={item.product
//                 OriginCountry} />
//                 <TextField source="productCode" value={item.productCode}/>
//                 <TextField source="productDescription" value={item.productDescription}/>
//             </Datagrid>
//          )
//         })
//         }
//     </List>
// );