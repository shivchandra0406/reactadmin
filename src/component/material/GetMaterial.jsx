import React,{useState,useEffect, useRef} from 'react';

import '../subcategory/GetSubCatData.module.css';
import services from '../../http/services';
import GetTableMaterial from './GetTableMaterial';
import AddMaterial from './AddMaterial'
import { IoMdAdd} from 'react-icons/io';

const GetMaterial = () => {

    const [data,setData] = useState([])
    const [edit,setEdit] = useState(false)
    const [editdata,setEditdata] = useState({})
    const [addsingle,setAddsingle] = useState(false)
    const serchparam = useRef('')
    const [filterdata,setFilterdata] = useState(false)
    const onChangeEdit = (item)=>{
        //console.log('item--->',item);
        setEdit(true)
        setEditdata(item)
        
    }
    const filterFunction =()=>{
        console.log('serparams',serchparam.current.value)
        if(serchparam.current.value===''){
            setData(filterdata)
        }else{
            setData(data.filter((item)=>{
                if(item.material_type_name.toLowerCase().includes(serchparam.current.value.toLowerCase())){
                    return item
                }
            }))
        }
    }

    const back = ()=>{
        setEdit(false)
        setAddsingle(false)
    }
    const onDelete = async(id)=>{
        let apiname = 'product/deleteMaterialData/'+id
        let confirm = window.confirm('Are you sure you want to delte material data')
        if(confirm){
            try{
                let result = await services.delete(apiname)
                if(result.Status){
                    setData(data.filter(item=>item._id!==id))
                    alert(result.message)
                }else{
                    alert(result.message)
                }
            }catch(err){
                console.log(err);
                alert(err.message)
            }
        }
    }

    useEffect(() => {
        const fetchData = async()=>{
            const apiname = "product/getMaterialData"
            try{
                const result = await services.get(apiname)
                if(result.Status===true){
                    setData(result.data)
                    setFilterdata(result.data)
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
        {!edit?<div className="tableMainContainer">
                <h2>All Material Data</h2>
                <div className='btnWrapper'>
                    <p>Search Product</p>
                    <input ref={serchparam} type='text' placeholder='serach product' className='inputtext' onChange={filterFunction}/>
                    <button onClick={()=>{
                        setAddsingle(true)
                        setEdit(true)
                    }}
                    style={{
                      width:90,
                      height:30,
                      background:'#04b023',
                      color:'white',
                      marginLeft:15,
                      outlineColor:'white',
                      border:0,
                      borderRadius:10
                  }}><IoMdAdd color='white'/>Add</button></div>
                <div className="tableContainer">
                    <div className="table"><span style={{fontSize:18,color:'green'}}>ID</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Material Name</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Action</span></div>
                </div>
                {
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className="tableContainer" key={item._id}>
                                <GetTableMaterial key={item._id} item={item} onChangeEdit ={()=>onChangeEdit(item)} onDelete={()=>onDelete(item._id)}/>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
                </div>:<AddMaterial item={editdata} back={back}/>}
            </>
    );
}

export default GetMaterial;
