import React from 'react'
import './InputText-Css.css';
const InputText = (props)=>{
    return (
        <>
           <input type="text" className="textinput" {...props} />
        </>
    )
}

export default InputText