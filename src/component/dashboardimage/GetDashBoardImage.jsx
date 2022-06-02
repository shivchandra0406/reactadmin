import React, { useState, useEffect, useRef } from 'react';
import '../product/ProductTable.module.css'
import services from '../../http/services';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import AddDashBoardImage from './AddDashBoardImage'
import { IoMdAdd } from 'react-icons/io';
import '../neworder/NewOrder.module.css'

const GetDashBoardImage = () => {

    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editdata, setEditdata] = useState({})
    const [singledata, setSingledata] = useState(false)
    const [backbtnrender, setBackbtnrender] = useState(false)
    const [filterdata, setFilterdata] = useState([])
    const searchparams = useRef('')

    const fetchData = async () => {
        const apiname = "product/getDeshBoardImage"
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
    useEffect(() => {
        console.log("lsdjfl;sjdfk------>");
        fetchData()
    }, [backbtnrender])

    useEffect(() => {
        fetchData()
    }, []);

    const onChangeEdit = (item) => {
        setEditdata(item)
        setEdit(true)
    }

    const filterFunction = () => {
        if (searchparams.current.value === '') {
            setData(filterdata)
        } else {
            setData(filterdata.filter(item => {
                if (item.dashboard_name.toLowerCase().includes(searchparams.current.value.toLowerCase())) {
                    return item
                }
            }))
        }
    }

    const onDelete = async (id) => {
        console.log('delete item', id);
        let confirm = window.confirm('Are you sure you want to delete')
        if (confirm) {
            try {
                let apiname = 'product/deleteDashBoard'
                let params = {
                    _id: [id]
                }
                let result = await services.delete(apiname, params)
                console.log(result);
                if (result.Status) {
                    setData(data.filter(item => item._id !== id))
                    alert(result.message)
                } else {
                    alert(result.message)
                }
            } catch (err) {
                alert(err.message)
                console.log(err);
            }
        }
    }
    const back = () => {
        setEdit(false)
        setSingledata(false)
        setBackbtnrender(!backbtnrender)
    }
    return (
        <>
            {
                !edit ? (<div className="tableMainContainer">
                    <h2 style={{ textAlign: 'center' }}>All DashBoard Data</h2>
                    <div style={{ marginBottom: 15, marginTop: 10 }}>
                        <p style={{ color: 'Highlight', marginBottom: 3 }}>Search DashBoard Data</p>
                        <input ref={searchparams} type='text' placeholder='search Data ...' onChange={filterFunction} style={{
                            width: 250,
                            height: 30,
                            outline: 'none',
                            borderRadius: 5,
                            paddingLeft: 10,
                            marginRight: 10
                        }} />
                        <button onClick={() => {
                            setSingledata(true)
                            setEdit(true)
                        }}
                            className="backbutton"
                        ><IoMdAdd color='white' />Add</button>
                    </div>
                    <div className="wraptable">
                        <div className="tableContainer">
                            <table style={{ width: '100%', borderCollapse: 'collapse', rowGap: 1 }}>
                                <thead><tr style={{ height: 40, padding: 5, textAlign: 'center', fontSize: 14, backgroundColor: 'yellow' }}>
                                    <th>Index</th>
                                    <th>ID</th>
                                    <th>DashBoard Title</th>
                                    <th>DashBoard Image</th>
                                    <th>Acion</th>
                                </tr></thead>

                                {
                                    data.length > 0 ? data.map((item, index) => {
                                        //console.log("item ");
                                        return (
                                            <tbody key={item._id}>                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item._id}</td>
                                                <td>{item.dashboard_name}</td>
                                                <td><img src={item.dashboard_img ? item.dashboard_img : ""} alt="image" style={{ width: 100, height: 30 }} /></td>
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
                    </div>
                </div>) : !singledata && edit ? <AddDashBoardImage item={editdata} back={back} /> : <AddDashBoardImage back={back} />
            }

        </>
    );
}

export default GetDashBoardImage;
