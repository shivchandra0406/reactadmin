import React from 'react'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
import './GetCat.moduls.css';
        
const GetTable = ({item,onChangeEdit,onDelete}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.category_name}</span></div>
        <div className="table1"><img src={item.category_image?item.category_image:""} alt="image" style={{width:100,height:30}}/></div>
        <div className="table1"><p>
        <AiFillEdit color='red' size={10} width={20} height={15} style={{padding:5+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={10} width={20} height={15}  style={{ padding:5,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
      </>     
    )
}

export default GetTable