import React from 'react'
import '../dashboardimage/GetDashBoardImage.module.css';
        
const GetTableMaterial = ({item}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.material_type_name}</span></div>
      </>     
    )
}

export default GetTableMaterial