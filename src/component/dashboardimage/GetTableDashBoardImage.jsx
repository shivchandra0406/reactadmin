import React from 'react'

import './GetDashBoardImage.module.css';
        
const GetTableDashBoardImage = ({item}) =>{
    //console.log("http://51.15.201.39/"+item_image);
    return (
        <>
        <div className="table1"><span>{item._id}</span></div>
        <div className="table1"><span>{item.dashboard_name}</span></div>
        <div className="table1"><img src={item.dashboard_img?item.dashboard_img:""} alt="image" style={{width:150,height:70}}/></div>
      </>     
    )
}

export default GetTableDashBoardImage