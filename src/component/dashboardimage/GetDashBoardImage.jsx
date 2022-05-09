import React,{useState,useEffect, useRef} from 'react';

import './GetDashBoardImage.module.css';
import services from '../../http/services';
import GetTableDashBoardImage from './GetTableDashBoardImage';
import AddDashBoardImage from './AddDashBoardImage'
import { IoMdAdd} from 'react-icons/io';

const GetDashBoardImage = () => {

    const [data,setData] = useState([])
    const [edit,setEdit] = useState(false)
    const [editdata,setEditdata] = useState({})
    const [singledata,setSingledata] = useState(false)
    const [backbtnrender,setBackbtnrender] = useState(false)
    const [filterdata,setFilterdata] = useState([])
    const searchparams = useRef('')
    
    const fetchData = async()=>{
        const apiname = "product/getDeshBoardImage"
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
    useEffect(()=>{
        console.log("lsdjfl;sjdfk------>");
        fetchData()
    },[backbtnrender])

    useEffect(() => {
        fetchData()
    }, []);

    const onChangeEdit = (item)=>{
        setEditdata(item)
        setEdit(true)
    }

    const filterFunction = () =>{
        if(searchparams.current.value===''){
            setData(filterdata)
        }else{
            setData(filterdata.filter(item=>{
                if(item.dashboard_name.toLowerCase().includes(searchparams.current.value.toLowerCase()))
                {
                    return item
                }
            }))
        }
    }

    const onDelete = async(id) =>{
        console.log('delete item',id);
        let confirm = window.confirm('Are you sure you want to delete')
        if(confirm){
            try{
                let apiname = 'product/deleteDashBoard'
                let params = {
                    _id:[id]
                }
                let result = await services.delete(apiname,params)
                console.log(result);
                if(result.Status){
                    setData(data.filter(item=>item._id!==id))
                    alert(result.message)
                }else{
                    alert(result.message)
                }
            }catch(err){
                alert(err.message)
                console.log(err);
            }
        }
    }
    const back = ()=>{
        setEdit(false)
        setSingledata(false)
        setBackbtnrender(!backbtnrender)
    }
    return (
        <>
        {
            !edit?(<div className="tableMainContainer">
                <h2>All Category Data</h2>
                <div className='btnWrapper'>
                    <p>Search DashBoard</p>
                    <input ref={searchparams} type='text' placeholder='serach product' className='inputtext' onChange={filterFunction} />
                    <button onClick={()=>{
                        setSingledata(true)
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
                  }}><IoMdAdd color='white'/>Add</button>
                </div>
                <div className="tableContainer">
                    <div className="table"><span style={{fontSize:18,color:'green'}}>ID</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>DashBoard Title</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>DashBoard Image</span></div> 
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Action</span></div> 
                </div>
                {
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className="tableContainer" key={item._id}>
                                <GetTableDashBoardImage key={item._id} item={item} onChangeEdit={()=>onChangeEdit(item)} onDelete={()=>onDelete(item._id)}/>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
                </div>):!singledata && edit?<AddDashBoardImage item={editdata} back = {back}/>:<AddDashBoardImage back={back}/>
            }
            </>
    );
}

export default GetDashBoardImage;
