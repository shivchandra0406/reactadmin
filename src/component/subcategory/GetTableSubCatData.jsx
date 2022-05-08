import React from 'react'

import './GetSubCatData.module.css';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
        
const GetTableSubCatData = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.categories.category_name}</span></div>
        <div className="table1"><span>{item.subcategory_name}</span></div>
        <div className="table1"><img src={item.subcategory_image?item.subcategory_image:""} alt="image" style={{width:150,height:70}}/></div>
        <div className="table1"><p>
        <AiFillEdit color='red' size={18} width={50} height={35} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={18} width={50} height={35}  style={{ padding:10,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
      </>     
    )
}

export default GetTableSubCatData