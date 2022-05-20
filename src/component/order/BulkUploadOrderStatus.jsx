import React,{useState} from 'react';
import services from '../../http/services';
import ReactLoading from 'react-loading';
import Styles from '../bulkUploadProduct/BulkUploadProduct.module.css'
import {SiMicrosoftexcel} from 'react-icons/si'

const BulkUploadOrderStatus = ({close}) => {
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState('')
    const [filename,setFileName] = useState('')
    const [showcsvFile,setShowcsvFile] = useState(false)

    const onChangeFile = (event) =>{
        console.log(event.target)
        setFileName(event.target.files[0].name)
        setFile(event.target.files[0])
        setShowcsvFile(true)
    }

    const uploadFile = async() =>{
        try{
            if(file){
                setLoading(true)
                let apiname = 'product/updateOrderStatusExcel'
                let formdata = new FormData()
                formdata.append('orderfile_excel',file)
                let result = await services.post(apiname,formdata,true)
                if(result.Status){
                    alert(result.message)
                    setLoading(false)
                    setShowcsvFile(false)
                    setFile('')
                    setFileName('')
                }else{
                    setLoading(false)
                    alert(result.message)
                }
            }else{
                alert('Please Choose Excel File')
            }
        }catch(err){
            alert(err.message)
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <>
        <h2 style ={{textAlign:'center'}}>Upload File</h2>
        <button className={Styles.closebtn} onClick={()=>close()}>close</button>
        <div className={Styles.main_container}>
            
            <div className={Styles.container}>
                <div className={Styles.btndiv}>
                    {showcsvFile ? <div className={Styles.framecontainer}>
                        <SiMicrosoftexcel size={55} color={'green'}/>
                        <p>{filename}</p>
                    </div> : ''}
                    <input type="file" name="file" id="file" className={Styles.csvbtn} onChange={onChangeFile} />
                    <label for="file" className={Styles.filelable}>Choose Excel File</label>
                </div>
                {!loading?<button className={Styles.submitbtn} onClick = {()=>uploadFile()}>Upload File</button>:
                <ReactLoading type={'bubbles'} color={'green'} height={40} width={150} />    
               }
            </div>
            </div>
        </>
    );
}

export default BulkUploadOrderStatus;
