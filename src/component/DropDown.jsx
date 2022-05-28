import React,{useState} from "react";

import Styles from './Dropdown.module.css'
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


function Dropdown({data,value,onChange,defaultValue}) {
    // const [selectedOption,setSelectedOption] = useState('')
    
    //   const handleChange = (selectedOption) => {
    //      setSelectedOption(selectedOption)
    //     // this.setState({ selectedOption }, () =>
    //     //   console.log(`Option selected:`, this.state.selectedOption)
    //     // );
      // };
      //console.log("default",data);
        return (
          <>
          <Select
            value={!defaultValue?value:data.filter(option=>option.value==defaultValue.value)}
            onChange={onChange}
            options={data}
            className={Styles.selectcontainer}
            isSearchable={true}
            name={defaultValue}
            
          />
          </>  
        );
      
}
export default Dropdown;