import React,{useState,useEffect,useRef} from 'react';

import './GetCat.moduls.css';
import services from '../../http/services';
import GetTable from './GetTable';
import AddCategory from '../category/AddCategory'
import { IoMdAdd} from 'react-icons/io';

const GetCatData = () => {
    const [data,setData] = useState([])
    const [edit,setEdit] = useState(false)
    const [editData,setEditData] = useState({})
    const [addCat,setAddCat] = useState(false)
    const search = useRef('')
    const [filterData,setFilterData] = useState([])
    const [bckbtn,setbackbtn] = useState(true)

    const fetchData = async()=>{
        const apiname = "product/getallcategories"
        try{
            const result = await services.get(apiname)
            if(result.Status===true){
                setData(result.result)
                setFilterData(result.result)
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
    useEffect(() => {
        fetchData()
    }, []);

    useEffect(()=>{
        fetchData()
    },[bckbtn])

    const onChangeEdit = (item) =>{
        setEditData(item)
        setEdit(true)
    }
    const back = () =>{
        setEdit(false)
        setAddCat(false)
        setbackbtn(!bckbtn)
    }

    // const onChageFilter = ()=>{
    //     console.log('serch',search.current.value);
    //     if(search.current.value===''){
    //         //console.log("sdkfjlsdhf");
    //         setData(filterData)
    //     }
    //     else{
    //         //console.log('skdfjlsjflkjslfjlsjlfjls');
    //         let fdata = filterData.filter((item)=>{
    //             if(item.category_name.toLowerCase().includes(search.current.value.toLowerCase())){
                    
    //                 return item
    //             }
    //         })
    //         setData(fdata)
    //     }
        
    // }

    const deleteCategoryData = async(id)=>{
        let confirm = window.confirm('Are you sure you want to delete category data');
        if(confirm){
            let apiname = 'product/deleteCategory'
            let params = {
                _id:[id]
            }
            const result = await services.delete(apiname,params)
            if(result.Status===true){
                setData(data.filter(item=>item._id!==id))
                alert(result.message)
            }else{
                alert(result.message)
            }
        }
    }

    return (
        <>
        {!edit?(<div className="tableMainContainer">
                <h2>All Category Data</h2>
                <div className='btnWrapper'>
                    <p>Search Product</p>
                    <input type='text' placeholder='serach product' className='inputtext' />
                    <button onClick={()=>{
                        setAddCat(true)
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
                <div className='mailtablecontainer'>
                <div className="tableContainer">
                    <div className="table"><span style={{fontSize:10,color:'green'}}>ID</span></div>
                    <div className="table"><span style={{fontSize:10,color:'green'}}>Category Name</span></div>
                    <div className="table"><span style={{fontSize:10,color:'green'}}>Category Image</span></div> 
                    <div className="table"><span style={{fontSize:10,color:'green'}}>Action</span></div> 
                </div>
                {  
                 
                 data.length>0? data.map((item, index) => {
                        //console.log("item ");
                        return (
                            
                            <div className="tableContainer" key={item._id}>
                                <GetTable key={item._id} item={item} onChangeEdit={()=>onChangeEdit(item)} onDelete={()=>deleteCategoryData(item._id)}></GetTable>
                            </div>
                        )
                    }) : <h2>No Any Product Data</h2>
                }
                </div>
            </div>):edit && !addCat ?<AddCategory item ={editData} back={back}/>:<AddCategory back={back}/>}
            </>
    );
}

export default GetCatData;
