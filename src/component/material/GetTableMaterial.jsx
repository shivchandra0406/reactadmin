import React from 'react'
import '../subcategory/GetSubCatData.module.css';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
const GetTableMaterial = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.material_type_name}</span></div>
        <div className="table1"><p>
        <AiFillEdit color='red' size={14} width={30} height={25} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={14} width={30} height={25}  style={{ padding:5,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
      </>     
    )
}

export default GetTableMaterial