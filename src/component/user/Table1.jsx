import React from 'react'
import Styles from './User.module.css'
import { AiFillDelete } from 'react-icons/ai';
        
const Table1 = ({item,onDelete}) =>{
    return (
        <>
        <div className={Styles.table1}><p>{item._id}</p></div>
        <div className={Styles.table1}><p style={{textAlign:'center'}}>{item.name}</p></div>
        <div className={Styles.table1}><p>{item.email}</p></div>
        <div className={Styles.table1}><p>{item.mobilenumber}</p></div>
        <div className={Styles.table1}><p>{item.dob}</p></div>
        <div className={Styles.table1}><img src={item.profile_img} alt="profile_img"/></div>
        <div className={Styles.table1}><p>{item.createdAt}</p></div>
        <div className={Styles.table1}><p>
        <AiFillDelete color='red' size={16} width={50} height={30}  style={{ padding:10,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
    </>     
    )
}

export default Table1