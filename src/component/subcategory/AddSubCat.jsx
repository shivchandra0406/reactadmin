import React,{ useState,useEffect } from 'react';

import InputText from '../../shared-component/inputtext/InputText';
import Dropdown from '../DropDown';
import services  from '../../http/services';
import { BiArrowBack } from 'react-icons/bi';

import Styles from './AddSubCat.module.css'
const AddSubCat = ({item,back}) => {
    const [image,setImage] = useState('')
    const [bimage,setBimage] = useState('')
    const [data,setData] = useState('')
    const [catdata,setCatdata] = useState([])
    const [selectedOption,setSelectedOption] = useState('')
    //console.log("item",item);
    useEffect(() => {
        if(item){
            setData(item.subcategory_name)
            setSelectedOption({value:item.categories._id,label:item.categories.category_name})
        }
        const fetchCatdata = async()=>{
            const apiname = "product/getallcategories"
            try{
                const result = await services.get(apiname)
                if(result.Status===true){
                    console.log(result);
                    const list = []
                    if(result.result.length>0){
                        for(let s of result.result)
                        {
                            list.push({label:s.category_name,value:s._id})
                        }
                        setCatdata(list)
                    }
                }
                else{
                    alert(result.message)
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchCatdata()
    },[]);
    
    //change select value
    const handleChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedOption(selectedOption)
       // this.setState({ selectedOption }, () =>
       //   console.log(`Option selected:`, this.state.selectedOption)
       // );
     };

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
        console.log("log",catdata);
        const formdata = new FormData()
        formdata.append('subcategory_name',data)
        formdata.append('subcat_image',image)
        formdata.append('categories',selectedOption.value)
        let apiname = 'product/addsubcategories'
        try{
            if(item){
                let apiname = 'product/updateSubCategory/'+item._id
                let result = await services.put(apiname,formdata,true)
                if(result.Status===true){
                    console.log(result);
                    alert('update successfully')
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
           <h2>Add SubCategory Data</h2> 
           <div className={Styles.bckbtn_container}>
           <button  onClick={()=>back()}
           style={{width:100,height:30,textAlign:"center",fontSize:16,backgroundColor:"white",borderRadius:10}}>
            <span style={{textAlignLast:'center'}}><BiArrowBack color='green'/></span> Back
           </button>
           </div>
           <InputText placeholder={'Enter SubCategory Name'} value={data} onChange={(e)=>setData(e.target.value)}/>
           <Dropdown data={catdata} value={selectedOption} defaultValue ={item?selectedOption:null}
            onChange={handleChange}/>
           <input type="file" name="file" id="file" className={Styles.inputfile} onChange={onchagefile}/>
           <label for="file" className={Styles.filelable}>Choose a Image</label>
           <p>Select Category Image</p>
            {image?
             <div className={Styles.image_conatiner}>
                <img src={bimage} alt="cat_img" className={Styles.imgsrc} onChange={onchagefile}/> 
            </div>:''
            }
           <input type="button" className={Styles.button_container} value="Add" onClick={onSubmint}/>
        </div>
    );
}

export default AddSubCat;
