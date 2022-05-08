import React,{useState,useEffect, useRef} from 'react';
import services from '../../http/services';
import AddSubCat from './AddSubCat';
import './GetSubCatData.module.css'
import GetTableSubCatData from './GetTableSubCatData';
import { IoMdAdd} from 'react-icons/io';

const GetSubCatData = () => {
    const [data,setData] = useState([])
    const [edit,setEdit] = useState(false)
    const [addsub,setAddsub]=useState(false)
    const [editdata,setEditdata] = useState({})

    useEffect(()=>{
        const fetchData = async()=>{
            const apiname = 'product/getSubCategoriesData'
            try{
                const result = await services.get(apiname)
                if(result.Status===true){
                    console.log(result);
                    setData(result.data)
                }else{
                    alert(result.message)
                    console.log(result);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[])

    const onChangeEdit = (item)=>{
        setEditdata(item)
        setEdit(true)
    }
    const back = ()=>{
        setEdit(false)
        setAddsub(false)
    }
    const onDelete= async(id)=>{
        let confirm = window.confirm('Are you sure you want delete subcategory data')
        if(confirm){
            let apiname = 'product/deleteSubCategory'
            let params = {
                _id:[id]
            }
            let result = await services.delete(apiname,params)
            if(result.Status){
                setData(data.filter(item=>item._id!==id))
                alert('delete successfully')
            }else{
                alert(result.message)
            }
                
        }
    }
    return (
        <>
        {!edit?(<div className="tableMainContainer">
                <h2>All SubCategory Data</h2>
                <div className='btnWrapper'>
                <p>Search Product</p>
                <input type='text' placeholder='serach product'  className='inputtext'/>
                <button onClick={()=>{
                    setAddsub(true)
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
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Category Name</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>SubCategory Name</span></div>
                    <div className="table"><span style={{fontSize:18,color:'green'}}>SubCategory Image</span></div> 
                    <div className="table"><span style={{fontSize:18,color:'green'}}>Action</span></div> 
                    </div>
                {
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (

                            <div className="tableContainer" key={item._id}>
                                <GetTableSubCatData key={item._id} item={item} onChangeEdit={()=>onChangeEdit(item)} onDelete={()=>onDelete(item._id)}/>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
                </div>):addsub===false&&edit?<AddSubCat item={editdata} back={back}/>:<AddSubCat back={back}/>}
            </>
    );
}

export default GetSubCatData;
