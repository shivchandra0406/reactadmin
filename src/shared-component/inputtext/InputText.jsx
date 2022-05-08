import React from 'react'
import './InputText-Css.css';
const InputText = (props)=>{
    return (
        <div className="main-container">
           <input type="text" className="textinput" {...props} />
        </div>
    )
}

export default InputText