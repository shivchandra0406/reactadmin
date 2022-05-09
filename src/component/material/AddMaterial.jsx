import React,{useState,useEffect} from 'react';
import InputText from '../../shared-component/inputtext/InputText';
//import Button from '../../shared-component/button-module/Button';
import Styles from '../dashboardimage/AddDashBoardImage.module.css'
import services from '../../http/services';
import { BiArrowBack } from 'react-icons/bi';

const AddMaterial = ({item,back}) => {
    const [data,setData] = useState('')

    useEffect(()=>{
        console.log("item--->",item);
        if(item){
            setData(item.material_type_name)
        }
    },[item])
    
    const onSubmint = async() =>{
        // const formdata = new FormData()
        // formdata.append('material_type_name',data)
        let params = {
            material_type_name:data
        }
        let apiname = 'product/addMaterialData'
        try{
            if(item){
                apiname = 'product/updateMaterialName'
                let params1={
                    _id:item._id,
                    material_name:data
                }  
                let result = await services.patch(apiname,params1)
                console.log('result-->',result);
                if(result.Status){
                    alert('update successfully')
                }else{
                    alert(result.message)
                }
            }else{
                const result = await services.postwithoutimage(apiname,params,false)
                if(result.Status===true){
                    alert('success')
                }else{
                    console.log(result);
                    alert(result.message)
                }
            }
        }catch(err){
            console.log(err);
            alert(err.message)
        }
    }
   
    return (
        <div className={Styles.container}>
            <h2>Add Material Data</h2>
            <div className={Styles.bckbtn_container}>
            <button  onClick={()=>back()}
            style={{width:100,height:30,textAlign:"center",fontSize:16,backgroundColor:"white",borderRadius:10}}>
             <span style={{textAlignLast:'center'}}><BiArrowBack color='green'/></span> Back
            </button>
            </div>
            <p>Enter Material Title</p>
           <InputText placeholder={'Enter Material Name'} value={data} onChange={(e)=>setData(e.target.value)}/>
           <input type="button" className={Styles.button_container} value={item?'Update':'Add'} onClick={onSubmint}/>
        </div>
    );
}

export default AddMaterial;