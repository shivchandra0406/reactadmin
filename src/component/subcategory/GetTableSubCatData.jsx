import React from 'react'

import Styles from './GetSubCatData.module.css';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
        
const GetTableSubCatData = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className={Styles.table1}><span>{item._id}</span></div>
        <div className={Styles.table1}><span>{item.categories.category_name}</span></div>
        <div className={Styles.table1}><span>{item.subcategory_name}</span></div>
        <div className={Styles.table1}><img src={item.subcategory_image?item.subcategory_image:""} alt="image" style={{width:100,height:30}}/></div>
        <div className={Styles.table1}><p>
        <AiFillEdit color='red' size={14} width={40} height={30} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={14} width={40} height={30}  style={{ padding:5,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
      </>     
    )
}

export default GetTableSubCatData