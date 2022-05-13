import React, { useState } from 'react';
import Styles from './BulkUploadProduct.module.css'
import { FaFileCsv } from 'react-icons/fa';
import services from '../../http/services';
const BulkUploadProduct = () => {
    const [showcsvFile, setShowcsvFile] = useState(false)
    const [filename, setFilename] = useState('')
    const [file, setFile] = useState('')
    const onChangeFile = (e) => {
        setFile(e.target.files[0])
        setShowcsvFile(true)
        setFilename(e.target.files[0].name)
        console.log(e.target.files[0]);
    }

    const uploadFile = async() =>{
        try{
            if(file){
                let apiname = 'product/uploadProductCsvFile'
                const myForm = new FormData()
                myForm.append('product_file',file)
                let result = await services.post(apiname,myForm,true)
                console.log(result);
                if(result.Status){
                    setShowcsvFile(false)
                    setFile('')
                    setFilename('')
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
    return (
        <>
            <h2>Upload Only Csv File</h2>
            <div className={Styles.container}>
                <div className={Styles.btndiv}>
                    {showcsvFile ? <div className={Styles.framecontainer}>
                        <FaFileCsv size={55} />
                        <p>{filename}</p>
                    </div> : ''}
                    <input type="file" name="file" id="file" className={Styles.csvbtn} onChange={onChangeFile} />
                    <label for="file" className={Styles.filelable}>Choose File</label>
                </div>
                <button className={Styles.submitbtn} onClick = {()=>uploadFile()}>Submit</button>
            </div>
        </>
    );
}

export default BulkUploadProduct;
