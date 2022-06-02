import React, { useState, useEffect, useRef } from 'react';

import '../subcategory/GetSubCatData.module.css';
import services from '../../http/services';
import '../neworder/NewOrder.module.css'
import AddMaterial from './AddMaterial'
import { IoMdAdd } from 'react-icons/io';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const GetMaterial = () => {

    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editdata, setEditdata] = useState({})
    const [addsingle, setAddsingle] = useState(false)
    const serchparam = useRef('')
    const [filterdata, setFilterdata] = useState(false)


    const onChangeEdit = (item) => {
        //console.log('item--->',item);
        setEdit(true)
        setEditdata(item)

    }
    const filterFunction = () => {
        console.log('serparams', serchparam.current.value)
        if (serchparam.current.value === '') {
            setData(filterdata)
        } else {
            setData(data.filter((item) => {
                if (item.material_type_name.toLowerCase().includes(serchparam.current.value.toLowerCase())) {
                    return item
                }
            }))
        }
    }

    const back = () => {
        setEdit(false)
        setAddsingle(false)
    }
    const onDelete = async (id) => {
        let apiname = 'product/deleteMaterialData/' + id
        let confirm = window.confirm('Are you sure you want to delte material data')
        if (confirm) {
            try {
                setData(data.filter(item => {
                    console.log(item)
                    return item._id !== id
                }))
                let result = await services.delete(apiname)
                if (result.Status) {
                    alert(result.message)

                } else {
                    alert(result.message)
                }
            } catch (err) {
                console.log(err);
                alert(err.message)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const apiname = "product/getMaterialData"
            try {
                const result = await services.get(apiname)
                if (result.Status === true) {
                    setData(result.data)
                    setFilterdata(result.data)
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
        fetchData()
    }, []);

    return (
        <>
            {!edit ? <div className="tableMainContainer">
                <h2 style={{ textAlign: 'center' }}>All Material Data</h2>
                <div style={{ marginBottom: 20, marginTop: 10 }}>
                    <p style={{ color: 'Highlight', marginBottom: 3 }}>Search Material</p>
                    <input ref={serchparam} type='text' placeholder='serach material' onChange={filterFunction} style={{
                        width: 250,
                        height: 30,
                        borderRadius: 5,
                        outline: 'none',
                        paddingLeft: 10,
                        marginRight: 5
                    }} />
                    <button onClick={() => {
                        setAddsingle(true)
                        setEdit(true)
                    }}
                        className="backbutton"
                    ><IoMdAdd color='white' />Add</button></div>
                <div className="tableContainer">
                    <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                        <thead> <tr style={{ height: 40, padding: 5, textAlign: 'center', fontSize: 14, backgroundColor: 'yellow' }}>
                            <th>Index</th>
                            <th>ID</th>
                            <th>Material Name</th>
                            <th>Action</th>
                        </tr></thead>

                        {
                            data.length > 0 ? data.map((item, index) => {
                                //console.log("item ");
                                return (
                                    <tbody key ={item._id}> <tr>
                                        <td>{index}</td>
                                        <td>{item._id}</td>
                                        <td>{item.material_type_name}</td>
                                        <td><p>
                                            <AiFillEdit color='#fff' size={16} width={30} height={25} style={{ padding: 7 + 'px', backgroundColor: '#5276f7' }} onClick={
                                                () => onChangeEdit(item)} />
                                            <AiFillDelete color='red' size={16} width={30} height={25} style={{ padding: 7, marginLeft: 10 + 'px', backgroundColor: '#c9c9c9' }} onClick={() => onDelete(item._id)} /></p></td>
                                    </tr></tbody>
                                )
                            }) : <h2>No Any Product Data</h2>
                        }
                    </table>
                </div>
            </div> : !addsingle && edit ? <AddMaterial item={editdata} back={back} /> : <AddMaterial back={back} />}
        </>
    );
}

export default GetMaterial;
