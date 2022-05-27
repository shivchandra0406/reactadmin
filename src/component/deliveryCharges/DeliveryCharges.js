import React,{useState,useEffect} from 'react';
import Styles from './DeliveryCharges.module.css'
import services from '../../http/services';
import '../neworder/NewOrder.module.css'
import { AiFillEdit} from 'react-icons/ai';
import AddDeliveryCharges from './AddDeliveryCharges';

const DeliveryCharges = () => {
    const [addData,setAddData] = useState(false)
    const [data,setData] = useState([])
    const [editData,setEditData] = useState({})
    const [close,setClose] = useState(false)
    const addFunction = () =>{
        setAddData(true)
    }
    const closeFunction = () =>{
        setAddData(false)
        setEditData({})
        setClose(!close)
    }
    
    const fetchData = async() =>{
        try{
            let apiname = 'account/getDeliveryCharges'
            let result = await services.get(apiname)
            console.log(result);
            if(result.Status){
                setData(result.data)
            }
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    //close time call data
    useEffect(()=>{
        fetchData()
    },[close])

    //Onchange Edit start
    const onChangeEdit = (item) => {
        setEditData(item)
        setAddData(true)
    }
    //Onchange Edit end
    return (
        <>
           { 
            !addData?<div>
                <h2 style={{letterSpacing:1,color:'#2B1AE5',marginBottom:20}}>All Delivery Charges information</h2>
                <div style={{marginBottom:10}}>
                    <button className={Styles.addbtb} onClick={addFunction}>Add</button>
                </div>
                <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                        <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow'}}>
                           <th>Index</th>    
                           <th>COUNTRY NAME</th>
                            <th>CHARGES</th>
                            <th>Action</th>
                        </tr>
                        {
                        data.length!==0?data.map((item,index)=>{
                            return<tr>
                                <td>{index+1}</td>
                                <td>{item.country_name}</td>
                                <td>{item.charges}</td>
                                <td><AiFillEdit color='red' size={14} width={30} height={20} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
                                    ()=>onChangeEdit(item)}/></td>
                            </tr>
                            }):<p>No Delivery Charges Data</p>
                        }
                </table>
                </div>
            </div>:<AddDeliveryCharges close={closeFunction} item={editData?editData:{}}/>
        }
        </>
    );
}

export default DeliveryCharges;
