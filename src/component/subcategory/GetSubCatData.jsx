import React, { useState, useEffect, useRef, createContext } from 'react';
import services from '../../http/services';
import AddSubCat from './AddSubCat';
import Styles from './GetSubCatData.module.css'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import '../neworder/NewOrder.module.css'

export const globalSubCatData = createContext()

const GetSubCatData = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [addsub, setAddsub] = useState(false)
    const [editdata, setEditdata] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const apiname = 'product/getSubCategoriesData'
            try {
                const result = await services.get(apiname)
                if (result.Status === true) {
                    console.log(result);
                    setData(result.data)
                } else {
                    alert(result.message)
                    console.log(result);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    const onChangeEdit = (item) => {
        setEditdata(item)
        setEdit(true)
    }
    const back = () => {
        setEdit(false)
        setAddsub(false)
    }
    const onDelete = async (id) => {
        let confirm = window.confirm('Are you sure you want delete subcategory data')
        if (confirm) {
            let apiname = 'product/deleteSubCategory'
            let params = {
                _id: [id]
            }
            let result = await services.delete(apiname, params)
            if (result.Status) {
                setData(data.filter(item => item._id !== id))
                alert('delete successfully')
            } else {
                alert(result.message)
            }
        }
    }

    //save data come from child component add subcategory start
    const saveData = (item) => {
        console.log("save data from child component ---->", item);
        data.unshift(item)
    }
    //save data come from child component add subcategory end

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
    //update data come from child component end
    return (
        <globalSubCatData.Provider value={{ saveData: saveData, updateData: updateData }}>
            <>
                {!edit ? (<div className={Styles.tableMainContainer
                }>
                    <h2 style={{ textAlign: 'center', letterSpacing: 1 }}>All SubCategory Data</h2>
                    <div style={{ marginBottom: 15, marginTop: 10 }}>
                        <p style={{ color: 'Highlight', marginBottom: 3 }}>Search Subcatgory Data</p>
                        <input type='text' placeholder='serach data.....' style={{
                            width: 250,
                            height: 30,
                            outline: 'none',
                            borderRadius: 5,
                            paddingLeft: 10
                        }} />
                        <button onClick={() => {
                            setAddsub(true)
                            setEdit(true)
                        }}
                            className={Styles.backbutton}
                        ><IoMdAdd color='white' />Add</button>
                    </div>
                    <div className={Styles.tableContainer}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                            <thead>                            <tr style={{ height: 40, padding: 5, textAlign: 'center', fontSize: 14, backgroundColor: 'yellow' }}>
                                <th>Index</th>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>SubCategory Name</th>
                                <th>SubCategory Image</th>
                                <th>Action</th>
                            </tr></thead>

                            {
                                data.length > 0 ? data.map((item, index) => {
                                    //console.log("item ");
                                    return (
                                        <tbody key={item._id}>                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item._id}</td>
                                            <td>{item.categories?.category_name}</td>
                                            <td>{item.subcategory_name}</td>
                                            <td><img src={item.subcategory_image ? item.subcategory_image : ""} alt="image" style={{ width: 100, height: 30 }} /></td>
                                            <td><p>
                                                <AiFillEdit color='#fff' size={16} width={40} height={30} style={{ padding: 7 + 'px', backgroundColor: '#5276f7' }} onClick={
                                                    () => onChangeEdit(item)} />
                                                <AiFillDelete color='red' size={16} width={40} height={30} style={{ padding: 7, marginLeft: 10 + 'px', backgroundColor: '#c9c9c9' }} onClick={() => onDelete(item._id)} /></p></td>
                                        </tr></tbody>
                                    )
                                }) : <h2>No Any SubCategory Data</h2>
                            }
                        </table>
                    </div>
                </div>) : addsub === false && edit ? <AddSubCat item={editdata} back={back} /> : <AddSubCat back={back} />}
            </>
        </globalSubCatData.Provider>
    );
}

export default GetSubCatData;
