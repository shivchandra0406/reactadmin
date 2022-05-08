import React,{useState,useEffect} from 'react';

import '../dashboardimage/GetDashBoardImage.module.css';
import services from '../../http/services';
import GetTableMaterial from './GetTableMaterial';

const GetMaterial = () => {

    const [data,setData] = useState([])
    useEffect(() => {
        const fetchData = async()=>{
            const apiname = "product/getMaterialData"
            try{
                const result = await services.get(apiname)
                if(result.Status===true){
                    setData(result.data)
                    console.log(result);
                }else{
                    console.log(result);
                    alert(result.message)
                }
            }catch(err){
                console.log(err);
                alert(err.message)
            }
        }
        fetchData()
    }, []);
    return (
        <>
        <div className="tableMainContainer">
                <h2>All Material Data</h2>
                <div className="tableContainer">
                    <div className="table"><span style={{fontSize:18,color:'green'}}>ID</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Material Name</span></div>
                </div>
                {
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className="tableContainer" key={item._id}>
                                <GetTableMaterial key={item._id} item={item}/>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
                </div>
            </>
    );
}

export default GetMaterial;
