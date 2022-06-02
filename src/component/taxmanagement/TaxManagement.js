import React,{useState,useEffect,createContext} from 'react';
import Styles from './TaxManagement.module.css'
import AddTaxes from './AddTaxes';
import services from '../../http/services';
import '../neworder/NewOrder.module.css'
import { AiFillEdit} from 'react-icons/ai';

export const TaxManagementContext = createContext()

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

    //updateData Come from child AddTaxes component start
    const updateData = (item) =>{
        console.log("update data",item);
        setData(data.map(ditem=>{
            if(item._id===ditem._id){
                return item
            }
            return ditem
        }))
    }
    //updateData Come from child AddTaxes component end

    return (
        <TaxManagementContext.Provider value={{updateData:updateData}}>
        <>
           { 
            !addData?<div>
                <h2 style={{letterSpacing:1,color:'#2B1AE5',marginBottom:20}}>All gst information</h2>
                <div style={{marginBottom:10}}>
                    <button className={Styles.addbtb} onClick={addFunction}>Add</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                        <thead>
                        <tr style={{ height:40,padding:5,textAlign: 'center', fontSize: 14, backgroundColor: 'yellow'}}>
                            <th>IGST</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {
                        data.length!==0?data.map(item=>{
                            return <tbody key={item._id}>
                            <tr>
                                <td>{item.igst}</td>
                                <td>{item.cgst}</td>
                                <td>{item.sgst}</td>
                                <td><AiFillEdit color='red' size={14} width={30} height={20} style={{padding:10+'px',backgroundColor:'#ebf2b3'}} onClick={
                                    ()=>onChangeEdit(item)}/></td>
                            </tr>
                            </tbody>
                            }):<p>No Taxes Data</p>
                        }
                </table>
            </div>:<AddTaxes close = {closeFunction} item = {editData?editData:{}}/>
        }
        </>
        </TaxManagementContext.Provider>
    );
}

export default TaxManagement;
