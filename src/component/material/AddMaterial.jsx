import React,{useState} from 'react';
import InputText from '../../shared-component/inputtext/InputText';
//import Button from '../../shared-component/button-module/Button';
import Styles from '../dashboardimage/AddDashBoardImage.module.css'
import services from '../../http/services';

const AddMaterial = () => {
    const [data,setData] = useState('')
    
    const onSubmint = async() =>{
        // const formdata = new FormData()
        // formdata.append('material_type_name',data)
        const params = {
            material_type_name:data
        }
        const apiname = 'product/addMaterialData'
        try{
            const result = await services.postwithoutimage(apiname,params,false)
            if(result.Status===true){
                alert('success')
            }else{
                console.log(result);
                alert(result.message)
            }
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    return (
        <div className={Styles.container}>
            <h2>Add Material Data</h2>
            <p>Enter Material Title</p>
           <InputText placeholder={'Enter Material Name'} value={data} onChange={(e)=>setData(e.target.value)}/>
           <input type="button" className={Styles.button_container} value="Add" onClick={onSubmint}/>
        </div>
    );
}

export default AddMaterial;