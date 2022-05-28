import React,{useState,useEffect} from 'react';
import InputText from '../../shared-component/inputtext/InputText';
//import Button from '../../shared-component/button-module/Button';
import Styles from './AddCategory.module.css'
import services from '../../http/services';
import { BiArrowBack } from 'react-icons/bi';

const AddCategory = ({item,back}) => {
    const [image,setImage] = useState('')
    const [bimage,setBimage] = useState('')
    const [data,setData] = useState('')

    const onchagefile = (e)=>{
        setImage(e.target.files[0])
        var reader = new FileReader();
            reader.onloadend = function() {
            //console.log('RESULT', reader.result)
            setBimage(reader.result) 
            }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(()=>{
        if(item){
            setData(item.category_name)
        }
    },[])
    const onSubmint = async() =>{
        //console.log(image,data,bimage);
        const formdata = new FormData()
        formdata.append('category_name',data)
        formdata.append('cat_image',image)
        let  apiname = 'product/addcategory'
        try{
            if(item){
                apiname = 'product/updateCategory/'+item._id
                let result = services.put(apiname,formdata,true)
                if(result.Status){
                    console.log("update data",result);
                    setData('')
                    setImage('')
                    setBimage('')
                    alert('update Successfully')
                }else{
                    alert(result.message)
                }
            }
            else{
                const result = await services.post(apiname,formdata,true)
                if(result.Status===true){
                    alert('Added Successfully')
                    setData('')
                    setImage('')
                    setBimage('')
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
            <h3 style={{textAlign:'center',textTransform:'uppercase',letterSpacing:1}}>Add Category</h3>
            <div className={Styles.bckbtn_container}>
            <button  onClick={()=>back()} className={Styles.bckbutton}>
             <span style={{textAlignLast:'center'}}><BiArrowBack color='#fff'/></span> Back
            </button>
            </div>
            <div className={Styles.formcontainer}>
           <p style={{marginBottom:3}}>Enter Category Name</p>
           <InputText placeholder={'Enter Category Name'} value={data} onChange={(e)=>setData(e.target.value)}/>
           <input type="file" name="file" id="file"  className={Styles.inputfile} onChange={onchagefile}/>
           <label for="file" className={Styles.filelable}>select image</label>
            {image?
             <div className={Styles.image_conatiner}>
                <img src={bimage} alt="cat_img" className={Styles.imgsrc} onChange={onchagefile}/> 
            </div>:''
            }
           <input type="button" className={Styles.button_container} value={item?"Update":"Add"} onClick={onSubmint}/>
           </div>
           </div>
    );
}

export default AddCategory;
