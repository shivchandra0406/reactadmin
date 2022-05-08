import React,{useState} from 'react';
import InputText from '../../shared-component/inputtext/InputText';
//import Button from '../../shared-component/button-module/Button';
import Styles from './AddDashBoardImage.module.css'
import services from '../../http/services';

const AddDashBoardImage = () => {
    const [image,setImage] = useState('')
    const [bimage,setBimage] = useState('')
    const [data,setData] = useState('')

    const onchagefile = (e)=>{
        setImage(e.target.files[0])
        var reader = new FileReader();
            reader.onloadend = function() {
            console.log('RESULT', reader.result)
            setBimage(reader.result) 
            }
        reader.readAsDataURL(e.target.files[0]);
    }
    const onSubmint = async() =>{
        console.log(image,data,bimage);
        const formdata = new FormData()
        formdata.append('dashboard_name',data)
        formdata.append('dashBoardImage',image)
        const apiname = 'product/addDashBoardImage'
        try{
            const result = await services.post(apiname,formdata,true)
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
            <h2>Add DashBoardImage</h2>
            <p>Enter DashBoard Title</p>
           <InputText placeholder={'Enter DashBoard Title'} value={data} onChange={(e)=>setData(e.target.value)}/>
           <input type="file" name="file" id="file"  className={Styles.inputfile} onChange={onchagefile}/>
           <label for="file" className={Styles.filelable}>select image</label>
           <p>Select DashBoard Image</p>
            {image?
             <div className={Styles.image_conatiner}>
                <img src={bimage} alt="cat_img" className={Styles.imgsrc} onChange={onchagefile}/> 
            </div>:''
            }
           <input type="button" className={Styles.button_container} value="Add" onClick={onSubmint}/>
        </div>
    );
}

export default AddDashBoardImage;