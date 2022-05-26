import React,{useState,useEffect} from 'react';
import Styles from './TaxManagement.module.css'
import AddTaxes from './AddTaxes';
import services from '../../http/services';
import '../neworder/NewOrder.module.css'
import { AiFillEdit} from 'react-icons/ai';

const TaxManagement = () => {
    const [addData,setAddData] = useState(false)
    const [data,setData] = useState([])
    const [editData,setEditData] = useState({})
    const addFunction = () =>{
        setAddData(true)
    }
    const closeFunction = () =>{
        setAddData(false)
        setEditData({})
    }
    const fetchData = async() =>{
        try{
            let apiname = 'account/getTax'
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
                <h2 style={{letterSpacing:1,color:'#2B1AE5',marginBottom:20}}>All gst information</h2>
                <div style={{marginBottom:10}}>
                    <button className={Styles.addbtb} onClick={addFunction}>Add</button>
                </div>
                <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                        <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow'}}>
                            <th>IGST</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Action</th>
                        </tr>
                        {
                        data.length!==0?data.map(item=>{
                            return<tr>
                                <td>{item.igst}</td>
                                <td>{item.cgst}</td>
                                <td>{item.sgst}</td>
                                <td><AiFillEdit color='red' size={14} width={30} height={20} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
                                    ()=>onChangeEdit(item)}/></td>
                            </tr>
                            }):<p>No Taxes Data</p>
                        }
                </table>
                </div>
            </div>:<AddTaxes close = {closeFunction} item = {editData?editData:{}}/>
        }
        </>
    );
}

export default TaxManagement;
