import React, { useState,useEffect } from "react";
import InputText from "../../shared-component/inputtext/InputText";
import './Product_Css.css'
import services from "../../http/services";
import Dropdown from '../DropDown';
import getproductdata from "../../getdatafrombackend/getprodutdata";
import { BiArrowBack } from 'react-icons/bi';
// import fs from 'fs'


const Product = ({item,back}) =>{
    const [categoryData,setCategoryData] = useState([])
    const [subCategoryData,setSubCategoryData] = useState([])
    const [dashboardData,setdashboardData] = useState([])
    const [materialData,setMaterilaData] = useState([])
    const [image,setImage] = useState([])
    const [bimage,setBimage] = useState([])
    const [bulletPoints,setBulletPoints] = useState({
        bulletPoint1:'',
        bulletPoint2:'',
        bulletPoint3:'',
        bulletPoint3:'',
        bulletPoint4:'',
        bulletPoint5:''
    })
    //const [fields,setFields] = useState(1)
    const [data,setData] = useState({
        productName:'',
        category:'',
        subCategory:"",
        dashboard_img:"",
        productPrice:"",
        material:"",
        productDescription:"",
        ProductImage:[],
        productCode:null
    })
    // let imagedata = item.productImage.length>0?item.productImage:[]
    // for(let image of imagedata)
    // {
    //     if(image!==''){
    //         let splitstr = image.productImage.split("/")[1]
    //         let item_image = image.productImage.substring(image.productImage.indexOf(splitstr))
    //         setBimage(old=>[...old,`http://51.15.201.39:3002/${item_image}`])
    //     }
    // }
    //console.log("item data",item);
    //get category,subcategory,dashboardimage and material data from api using useEffet
    useEffect(()=>{
        console.log("item",item);
        if(item){
            setData(old=>{
                return {...old,
                    productName:item?item.productName:'',
                    category:{value:item?item.category?._id:'',label:item?item.category?.category_name:''},
                    subCategory:{value:item?item.subCategory?._id:"",label:item?item.subCategory?.subcategory_name:''},
                    dashboard_img:{value:item?item.dashboard_img?._id:"",label:item?item.dashboard_img?.dashboard_name:''},
                    productPrice:item?item.productPrice:"",
                    material:{value:item?item.material?._id:"",lable:item?item.material?.material_type_name:''},
                    productDescription:item?item.productDescription:"",
                    productCode:item?.productCode
                }
            })
            //let {bulletPoint1,bulletPoint2,bulletPoint3,bulletPoint4,bulletPoint5} = item.bulletPoints
            setBulletPoints(item.bulletPoints)
        }
        const getAllProductData = async()=>{
            try{
                const catdata = await getproductdata.fetchCatData()
                if(catdata.status===true){
                    const {result} = catdata
                    //console.log("cat",catdata)
                    setCategoryData(result)
                    if(item){
                        let subdata = await getproductdata.fetchSubCategoryData(item.category._id)
                        if(subdata.status===true){
                            //console.log();
                            setSubCategoryData(subdata.result)
                        }else{
                            setSubCategoryData([])
                        }
                    }
                }
                const matdata = await getproductdata.fetchMaterila()
                if(matdata.status===true){
                    const {result} = matdata
                    //console.log("mat",result)
                    setMaterilaData(result)
                }
                const dashdata = await getproductdata.fetchDashBoardImageData()
                if(dashdata.status===true){
                    const {result} = dashdata
                    //console.log("dash",result[0])
                    setdashboardData(result)
                }
            }catch(err){
                console.log(err);
            }
        }
        getAllProductData()
    },[])

    //handle onchange categorydata
    const handleCategoryCangeData = async(changevalue)=>{
        console.log(changevalue);
        try{
            setData((old)=>{
                return {...old,category:changevalue}
            })
            const result = await getproductdata.fetchSubCategoryData(changevalue.value)
            if(result.status===true){
                //console.log();
                setSubCategoryData(result.result)
            }else{
                setSubCategoryData([])
            }
        }catch(err){
            console.log(err);
        }
    }
   

    const onImageChange = (event) => {
            console.log("shvichandfkadsf",event.target.files);
            //setImage(event.target.files)
            if (event.target.files) {
            let list = []
             for(let i=0;i<event.target.files.length;i++){
                setImage((old)=>{
                    return [...old,event.target.files[i]]
                })
                let path = URL.createObjectURL(event.target.files[i])
                console.log('path',event.target.files[i].name);
                setBimage((o)=>{
                    return [...o,path]
                }) 
            }
        }
        // setData((olddata)=>{
        //     console.log("shflsjd=---->",image);
        //     return {...olddata,ProductImage:[...image]}
        // })
    }

    const saveProduct = async() =>{
        console.log("cat",categoryData)
        data.ProductImage=image
        console.log('details',data,data.ProductImage.length,image);
        let apiname = "product/addProduct"
        const formdata = new FormData()
        formdata.append('productName',data.productName)
        formdata.append('category',data.category.value)
        formdata.append('subCategory',data.subCategory.value)
        data.dashboard_img.value && formdata.append('dashboard_img',data.dashboard_img.value)
        formdata.append('productPrice',data.productPrice)
        formdata.append('material',data.material.value)
        formdata.append('bulletPoints[bulletPoint1]',bulletPoints.bulletPoint1)
        formdata.append('bulletPoints[bulletPoint2]',bulletPoints.bulletPoint2)
        formdata.append('bulletPoints[bulletPoint3]',bulletPoints.bulletPoint3)
        formdata.append('bulletPoints[bulletPoint4]',bulletPoints.bulletPoint4)
        formdata.append('bulletPoints[bulletPoint5]',bulletPoints.bulletPoint5)
        formdata.append('productDescription',data.productDescription)
        formdata.append('productCode',data.productCode)
        image.map(img=>formdata.append('ProductImage',img))
        try{
            // const config = {     
            //     headers: { 'content-type': 'multipart/form-data' }
            // }
            if(item){
                console.log("itemskdfjksdf---->",item._id,data);
                apiname='product/updateProduct/'+item._id
                let result = await services.put(apiname,formdata,true)
                if(result.Status){
                    alert(result.message)
                }else{
                    alert(result.message)
                }
            }else{
                const result = await services.post(apiname,formdata,true)
                if(result.Status===true){
                    console.log(result);
                    alert('success')
                }else{
                    alert('Failue')
                    console.log(formdata.get('productName'),formdata.get('ProductImage'))
                }
        }
        }catch(err){
            alert(err.message)
        }
    }
    
    
    return (
        <div className="main_container">
            <h2>Product</h2>
            <div className="bckbtn_container">
             <button  onClick={()=>back()}
             style={{width:100,height:30,textAlign:"center",fontSize:16,backgroundColor:"white",borderRadius:10}}>
              <span style={{textAlignLast:'center'}}><BiArrowBack color='green'/></span> Back
             </button>
            </div>
            
            <div className="textinput-container">
              <p>Enter ProductName</p>
              <InputText placeholder="Enter Product Title" value={data.productName} onChange={(event)=>{
                  setData((old)=>{
                      return {...old,productName:event.target.value}
                  })
              }}/>
              <p>Enter Category id</p>
              <Dropdown data={categoryData} value = {data.category} defaultValue={item?data.category:null}
              onChange={handleCategoryCangeData}/>
              
              <p>Enter SubCategory id</p>
              <Dropdown data={subCategoryData} value={data.subCategory} defaultValue={item?data.subCategory:null} 
              onChange={(changevalue)=>{
                  setData(old=>{
                      return {...old,subCategory:changevalue}
                  })
              }}/>
              <p>Enter DashBoard id</p>
              <Dropdown data={dashboardData} value={data.dashboard_img} defaultValue={item?data.dashboard_img:null}
              onChange={
                (change)=>{
                    setData((old)=>{
                        return {...old,dashboard_img:change}
                    })
                }  
              }/>
              <p>Select Material</p>
              <Dropdown value={data.material} data = {materialData} defaultValue={item?data.material:null}
              onChange={(change)=>{
                  setData((old)=>{
                      return {...old,material:change}
                  })
              }}/>
              
              <p>Enter Product Price</p>
              <InputText placeholder="Enter Price" value={data.productPrice} onChange={(e)=>{
                  setData((old)=>{
                      return {...old,productPrice:e.target.value}
                  })
              }}/>
              <p>Enter Product Code</p>
              <InputText placeholder="Enter Product Code" value={data.productCode} onChange={(e)=>{
                  setData((old)=>{
                      return {...old,productCode:e.target.value}
                  })
              }}/>
              <p>Enter Product Description</p>
              <InputText placeholder="Enter Product Description" value={data.productDescription} onChange={(e)=>{
                  setData((old)=>{
                      return {...old,productDescription:e.target.value}
                  })
              }}/>
              <p>Enter All Bullet Points</p>
                <div className="bulletContainer">
                    <InputText placeholder="Enter Bullet Points1" value={bulletPoints.bulletPoint1} onChange={(e)=>{
                        setBulletPoints((old)=>{
                          return {...old,bulletPoint1:e.target.value}
                        } )
                    }}/> 
                    <InputText placeholder="Enter Bullet Points2" value={bulletPoints.bulletPoint2} onChange={(e)=>{
                        setBulletPoints((old)=>{
                          return {...old,bulletPoint2:e.target.value}  
                        } )
                    }}/> 
                    <InputText placeholder="Enter Bullet Points3" value={bulletPoints.bulletPoint3} onChange={(e)=>{
                        setBulletPoints((old)=>{
                          return {...old,bulletPoint3:e.target.value}  
                        } )
                    }}/> 
                    <InputText placeholder="Enter Bullet Points4" value={bulletPoints.bulletPoint4} onChange={(e)=>{
                        setBulletPoints((old)=>{
                          return {...old,bulletPoint4:e.target.value}  
                        } )
                    }}/> 
                    <InputText placeholder="Enter Bullet Points5" value={bulletPoints.bulletPoint5} onChange={(e)=>{
                        setBulletPoints((old)=>{
                          return {...old,bulletPoint5:e.target.value}  
                        } )
                    }}/>   
                </div>
              <p>Choose Product Image</p>
             {image.length>0?<div className="inputimages">
                {
                    image?bimage.map((item)=>{
                        //console.log("shivchand----->",item);
                        return(
                            <div className="imageblock">
                            <img src={`${item}`} alt="img" style={{width:100,height:50}} className="imgsrc"/>
                            </div>
                        )
                    }):null
                }
             </div>:""
            }
              <input type="file" name="file" id="file" onChange={onImageChange} className="inputfile" multiple />
              <label for="file">Choose a file</label>
            </div>
            
            <div className="buttonConatiner" >
             <button className="button" onClick={saveProduct}><span>{item?'Update':'Save'}</span></button>
            </div>
        </div>
    )
}

export default Product