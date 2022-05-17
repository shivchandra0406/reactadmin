import React, { useState } from 'react';
import Styles from './BulkUploadProduct.module.css'
import { FaFileCsv } from 'react-icons/fa';
import {BsImages} from 'react-icons/bs'
import services from '../../http/services';
import ReactLoading from 'react-loading';

const BulkUploadProduct = () => {
    const [showcsvFile, setShowcsvFile] = useState(false)
    const [showimagefile,setShowimagefile] = useState(false)
    const [filename, setFilename] = useState('')
    const [imagename,setImagename] = useState('')
    const [file, setFile] = useState('')
    const [productimage,setProductimage] = useState([])
    const [loading,setLoading] = useState(false)
  
    const onChangeFile = (e) => {
        setFile(e.target.files[0])
        setShowcsvFile(true)
        setFilename(e.target.files[0].name)
        console.log(e.target.files[0]);
    }

    const uploadFile = async() =>{
        try{
            if(file){
                setLoading(true)
                let apiname = 'product/uploadProductCsvFile'
                const myForm = new FormData()
                myForm.append('product_file',file)
                let result = await services.post(apiname,myForm,true)
                console.log(result);
                if(result.Status){
                    setShowcsvFile(false)
                    setFile('')
                    setFilename('')
                    setLoading(false)
                    alert('Your Product upload Successfully')
                }else{
                    alert(result.message)
                }
            }else{
                alert('Pleas Choose Csf File')
            }
        }catch(err){
            throw err
        }
    }

    //onchange proudct image
    const onChangeProduct = (event) =>{
        if (event.target.files) {
            //let list = []
             for(let i=0;i<event.target.files.length;i++){
                setProductimage((old)=>{
                    return [...old,event.target.files[i]]
                })
            }
        }
        setShowimagefile(true)
        setImagename('your All Product image selected')
    }

    //uload product image function
    const uploadProductImage = async() =>{
        if(productimage.length===0){
            alert('Please Select image')
        }else{
            try{
                setLoading(true)
                let apiname = 'product/uploadBulkProductImage'
                const myForm = new FormData()
                //myForm.append('ProductImage',productimage)
                productimage.map(img=>myForm.append('ProductImage',img))
                let result = await services.post(apiname,myForm,true)
                console.log("message",result)
                if(result.Status){
                    alert(result.message)
                    setProductimage([])
                    setShowimagefile(false)
                    setImagename('')
                    setLoading(false)
                }else{
                    alert(result.message)
                }
            }catch(err){
                alert(err.message)
                console.log(err)
            }
        }
    }
    
    return (
        <>
        <h2 style ={{textAlign:'center'}}>Upload File</h2>
        <div className={Styles.main_container}>
            
            <div className={Styles.container}>
                <div className={Styles.btndiv}>
                    {showcsvFile ? <div className={Styles.framecontainer}>
                        <FaFileCsv size={55} color={'green'}/>
                        <p>{filename}</p>
                    </div> : ''}
                    <input type="file" name="file" id="file" className={Styles.csvbtn} onChange={onChangeFile} />
                    <label for="file" className={Styles.filelable}>Choose File</label>
                </div>
                {!loading?<button className={Styles.submitbtn} onClick = {()=>uploadFile()}>Upload CSV</button>:
                <ReactLoading type={'bubbles'} color={'green'} height={40} width={150} />    
               }
            </div>
            <div className={Styles.container}>
                <div className={Styles.btndiv}>
                    {showimagefile ? <div className={Styles.framecontainer}>
                        <BsImages size={55} color={'green'}/>
                        <p style={{fontSize:14}}>{imagename}</p>
                    </div> : ''}
                    <input type="file" name="file1" id="file1" className={Styles.csvbtn} onChange={onChangeProduct} multiple />
                    <label for="file1" className={Styles.filelable}>Choose Product Image</label>
                </div>
                {!loading?<button className={Styles.submitbtn} onClick = {()=>uploadProductImage()}>Upload Image</button>:
                <ReactLoading type={'bubbles'} color={'green'} height={40} width={150} />}
            </div>
            
        </div>
        </>
    );
}

export default BulkUploadProduct;
