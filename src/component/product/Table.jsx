import React from 'react'
import Styles from './ProductTable.module.css'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
        
const Table = ({item,onChangeEdit,onDelete}) =>{
    const image = item.productImage.length>0?item.productImage[0].productImage:""
    let item_image=''
    if(image!==''){
        let splitstr = image.split("/")[1]
        item_image = image.substring(image.indexOf(splitstr))
    }
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className={Styles.table1}><img src={item.productImage.length>0?"http://51.15.201.39:3002/"+item_image:item_image} alt="image" style={{width:150,height:70}}/></div>
        <div className={Styles.table1}><p style={{textAlign:'center'}}>{item.productName}</p></div>
        <div className={Styles.table1}><p>{item.category?.category_name}</p></div>
        <div className={Styles.table1}><p>{item.subCategory?.subcategory_name}</p></div>
        <div className={Styles.table1}><p>{item.dashboard_img?.dashboard_name}</p></div>
        <div className={Styles.table1}><p>{item.productPrice}</p></div>
        <div className={Styles.table1}><p>{item.productOffer}</p></div>
        <div className={Styles.table1}><p>{item.productQty}</p></div>
        <div className={Styles.table1}><p>{item.productOriginCountry}</p></div>
        <div className={Styles.table1}><p>{item.productCode}</p></div>
        <div className={Styles.table1}><p>{item.productDescription}</p></div> 
        <div className={Styles.table1}><p>
        <AiFillEdit color='red' size={18} width={50} height={35} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
            onChangeEdit}/>
        <AiFillDelete color='red' size={18} width={50} height={35}  style={{ padding:10,marginLeft:10+'px',backgroundColor:'#ebf2b3'}} onClick={onDelete}/></p></div>
    </>     
    )
}

export default Table