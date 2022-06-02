import React, { useState, useEffect, useRef, createContext } from 'react';

import './GetCat.moduls.css';
import services from '../../http/services';
import AddCategory from '../category/AddCategory'
import { IoMdAdd } from 'react-icons/io';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const CatData = createContext()

const GetCatData = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editData, setEditData] = useState({})
    const [addCat, setAddCat] = useState(false)
    const search = useRef('')
    const [filterData, setFilterData] = useState([])
    const [bckbtn, setbackbtn] = useState(true)

    const fetchData = async () => {
        const apiname = "product/getallcategories"
        try {
            const result = await services.get(apiname)
            if (result.Status === true) {
                setData(result.result)
                setFilterData(result.result)
                console.log(result);
            } else {
                console.log(result);
                alert(result.message)
            }
        } catch (err) {
            console.log(err);
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    // useEffect(() => {
    //     fetchData()
    // }, [bckbtn])

    const onChangeEdit = (item) => {
        setEditData(item)
        setEdit(true)
    }
    const back = () => {
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

    const deleteCategoryData = async (id) => {
        let confirm = window.confirm('Are you sure you want to delete category data');
        if (confirm) {
            let apiname = 'product/deleteCategory'
            let params = {
                _id: [id]
            }
            const result = await services.delete(apiname, params)
            if (result.Status === true) {
                setData(data.filter(item => item._id !== id))
                alert(result.message)
            } else {
                alert(result.message)
            }
        }
    }

    //SaveData come from child component start
    const saveData = (item) => {
        console.log("item---->", item);
        return setData((old) => {
            return [...old, item]
        })
    }
    //SaveData come from child component end

    //update data come from child component start
    const updateData = (item) => {
        return setData(old => {
            return old.map(d => {
                if (d._id === item._id) {
                    return item
                }
                return d
            })
        })
    }
    //update data come form child component end

    return (
        <CatData.Provider value={{ saveData: saveData, updateData: updateData }}>
            <>
                {!edit ? (<div className="tableMainContainer">
                    <h3 style={{ textAlign: 'center', letterSpacing: 1, textTransform: "uppercase" }}>All Category Data</h3>
                    <div style={{
                        marginBottom: 15,
                        marginTop: 10
                    }}>
                        <p style={{ marginBottom: 3, color: '#6232f0' }}>Search Catgory Data</p>
                        <input type='text' placeholder='search data...' style={{
                            width: 250,
                            height: 30,
                            borderRadius: 5,
                            paddingLeft: 10,
                            outline: 'none'
                        }} />
                        <button onClick={() => {
                            setAddCat(true)
                            setEdit(true)
                        }}
                            style={{
                                width: 90,
                                height: 30,
                                background: '#04b023',
                                color: 'white',
                                marginLeft: 15,
                                outlineColor: 'white',
                                border: 0,
                                borderRadius: 10
                            }}><IoMdAdd color='white' />Add</button>
                    </div>
                    <div className='mailtablecontainer'>
                        <div className="tableContainer">
                            <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                                <thead><tr style={{ height: 40, padding: 5, textAlign: 'center', fontSize: 14, backgroundColor: 'yellow' }}>
                                    <th>Index</th>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Category Image</th>
                                    <th>Action</th>
                                </tr></thead>
                                {

                                    data.length > 0 ? data.map((item, index) => {
                                        //console.log("item ");
                                        return (
                                            <tbody key={item._id}>                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item._id}</td>
                                                <td>{item.category_name}</td>
                                                <td><img src={item.category_image ? item.category_image : ""} alt="image" style={{ width: 100, height: 30 }} /></td>
                                                <td><p>
                                                    <AiFillEdit color='#fff' size={16} width={20} height={15} style={{ padding: 7 + 'px', backgroundColor: '#5276f7' }} onClick={
                                                        () => onChangeEdit(item)} />
                                                    <AiFillDelete color='red' size={16} width={20} height={15} style={{ padding: 7, marginLeft: 10 + 'px', backgroundColor: '#c9c9c9' }} onClick={() => deleteCategoryData(item._id)} /></p></td>
                                            </tr></tbody>
                                        )
                                    }) : <h2>No Catgory Data</h2>
                                }
                            </table>
                        </div>
                    </div>
                </div>) : edit && !addCat ? <AddCategory item={editData} back={back} /> : <AddCategory back={back} />}
            </>
        </CatData.Provider>
    );
}

export default GetCatData;
