import React from 'react'
import '../dashboardimage/GetDashBoardImage.module.css';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
const GetTableMaterial = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.material_type_name}</span></div>
        <div className="table1"><p>
        <AiFillEdit color='red' size={18} width={50} height={35} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={18} width={50} height={35}  style={{ padding:10,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
      </>     
    )
}

export default GetTableMaterial