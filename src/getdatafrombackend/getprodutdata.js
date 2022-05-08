import services from "../http/services";

const getproductdata={
    fetchCatData:async()=>{
        try{
            const apiname='product/getallcategories'
            let result = await services.get(apiname)
            if(result.Status===true){
                console.log("result--->",result);
                result = result.result
                let list = []
                if(result.length!==0){
                    for(let d of result){
                        list.push({value:d._id,label:d.category_name})
                    }
                    return {status:true,result:list}
                }                
                return {status:false}
            }else{
                console.log(result);
                return {status:false}
            }
        }catch(err){
            console.log("categorie data",err);
            throw err
        }
    },
    fetchMaterila:async()=>{
        try{
            const apiname='product/getMaterialData'
            const result = await services.get(apiname)
            if(result.Status===true){
                let data = result.data
                let list = []
                if(data.length!==0){
                    for(let d of data){
                        list.push({value:d._id,label:d.material_type_name})
                    }
                    return {status:true,result:list}
                }                
                return {status:false}
            }else{
                console.log(result);
                return {status:false}
            }
        }catch(err){
            console.log("categorie data",err);
            throw err
        }   
    },
    fetchDashBoardImageData:async()=>{
        try{
            const apiname='product/getDeshBoardImage'
            const result = await services.get(apiname)
            if(result.Status===true){
                let data = result.data
                let list = []
                if(data.length!==0){
                    for(let d of data){
                        list.push({value:d._id,label:d.dashboard_name})
                    }
                    return {status:true,result:list}
                }                
                return {status:false}
            }else{
                console.log(result);
                return {status:false}
            }
        }catch(err){
            console.log("categorie data",err);
            throw err
        } 
    },
    fetchSubCategoryData:async(id)=>{
        try{
            const apiname=`product/getSubCatAcToCatId/${id}`
            const result = await services.get(apiname)
            if(result.Status===true){
                let data = result.data!==null?result.data.subcategory:[]
                let list = []
                if(data.length!==0){
                    for(let d of data){
                        list.push({value:d._id,label:d.subcategory_name})
                    }
                    return {status:true,result:list}
                }                
                return {status:false}
            }else{
                console.log(result);
                return {status:false}
            }
        }catch(err){
            throw err
        }  
    }
}

export default getproductdata