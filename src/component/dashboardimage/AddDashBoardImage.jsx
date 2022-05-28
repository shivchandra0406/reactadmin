import React,{useState,useEffect} from 'react';
import InputText from '../../shared-component/inputtext/InputText';
//import Button from '../../shared-component/button-module/Button';
import Styles from './AddDashBoardImage.module.css'
import services from '../../http/services';
import { BiArrowBack } from 'react-icons/bi';


const AddDashBoardImage = ({item,back}) => {
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
    useEffect(() => {
        if(item)
            setData(item.dashboard_name)
    }, [item]);
    const onSubmint = async() =>{
        console.log(image,data,bimage);
        const formdata = new FormData()
        formdata.append('dashboard_name',data)
        formdata.append('dashBoardImage',image)
        let apiname = 'product/addDashBoardImage'
        try{
            if(item){
                apiname = 'product/updateDashBoardData/'+item._id
                let result = await services.put(apiname,formdata,true)
                console.log(result);
                if(result.Status===true){
                    alert('Update successfully')
                    //console.log(result);
                }else{
                    alert(result.message)
                }
            }else{
                const result = await services.post(apiname,formdata,true)
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
            <h3 style={{textTransform:'uppercase',textAlign:'center'}}>Add DashBoard Image</h3>
            <div className={Styles.bckbtn_container}>
            <button  onClick={()=>back()} className={Styles.backbutton}>
             <span style={{textAlignLast:'center'}}><BiArrowBack color='#fff'/></span> Back
            </button>
            </div>
            <div className={Styles.formcontainer}>
            <p style={{marginBottom:3,color:'Highlight'}}>Enter DashBoard Title</p>
           <InputText placeholder={'Enter DashBoard Title'} value={data} onChange={(e)=>setData(e.target.value)}/>
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

export default AddDashBoardImage;