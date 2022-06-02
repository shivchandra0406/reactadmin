import React,{useState,useEffect} from 'react';
import Styles from '../faq/Faq.module.css'
import services from '../../http/services';
import '../neworder/NewOrder.module.css'
import { AiFillDelete} from 'react-icons/ai';
import AddNotification from './AddNotification';

const GetNotification = () => {
    const [addData,setAddData] = useState(false)
    const [data,setData] = useState([])
    const [close,setClose] = useState(false)
    const addFunction = () =>{
        setAddData(true)
    }
    const closeFunction = () =>{
        setAddData(false)
        setClose(!close)
    }
    
    const fetchData = async() =>{
        try{
            let apiname = 'account/getNotificationByAdmin'
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

    //delete Notification start
    const deletNotificaion = async(_id)=>{
        try{
            let confirmMessage = window.confirm('Are you Sure You Want delete')
            if(confirmMessage){
                let apiname = 'account/deleteNotification/'+_id
                let result = await services.delete(apiname)
                if(result.Status){
                    alert('Delete Successfully')
                    setData(data.filter(item=>item._id!==_id))
                }else{
                    alert(result.message)
                }
            }
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
    //delete Notification end
    return (
        <>
           { 
            !addData?<div>
                <h2 style={{letterSpacing:1,color:'#2B1AE5',marginBottom:20}}>All Notificaion DATA</h2>
                <div style={{marginBottom:10}}>
                    <button className={Styles.addbtb} onClick={addFunction}>Add</button>
                </div>
                <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                        <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow'}}>
                            <th>Index</th>
                            <th>Title</th>
                            <th>Product</th>
                            <th>Action</th>
                        </tr>
                        {
                        data.length!==0?data.map((item,index)=>{
                            return<tr>
                                <td>{index+1}</td>
                                <td>{item.title}</td>
                                <td><p style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.product?.productName}</p></td>
                                <td><AiFillDelete color='red' size={14} width={30} height={20} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
                                    ()=>deletNotificaion(item._id)}/></td>
                            </tr>
                            }):<p>No Notification Data</p>
                        }
                </table>
                </div>

            </div>:<AddNotification close={closeFunction}/>
        }
        </>
    );
}

export default GetNotification;
