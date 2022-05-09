//const APIURL ="http://pinponixelb-env.eba-gj363pf3.us-east-1.elasticbeanstalk.com:3000/";
//const APIURL = 'http://52.4.0.180:3000/';
const APIURL = 'http://51.15.201.39:3002/'
//const APIURL = 'http://51.15.204.121:3000/';

const headers = {
  'Content-Type': 'application/json',
  
};
     

const services = {
  post: async (apiname, data, image = false) => {
    try {
      console.log('the api datas',data,apiname,image);
      console.log(APIURL+apiname);
      const response = await fetch(APIURL + apiname, {
        method: 'POST',
        body: !image ? JSON.stringify(data) : data,
      });
      const json = await response.json();
      // console.log(json);
      return json;
    } 

    catch (err) {
      console.log(err);
      throw err;
    }
  },
  
  postwithoutimage:async (apiname, data, image = false) => {
    try {
      console.log('the api datas',data,apiname,image);
      console.log(APIURL+apiname);
      const response = await fetch(APIURL + apiname, {
        method: 'POST',
        body: !image ? JSON.stringify(data) : data,
        headers:!image?headers:''
      });
      const json = await response.json();
      // console.log(json);
      return json;
    } 
    catch (err) {
      console.log(err);
      throw err;
    }
  },
  put: async (apiname, data, image = false) => {
    try {
      console.log('the api datas', data,apiname,image);
      let options={
        method: 'PUT',
        body: !image ? JSON.stringify(data) : data
      }
      if(!image){
         options.headers=headers
      }
      const response = await fetch(APIURL + apiname,options);
      const json = await response.json();
      return json;
    } catch (err) {
      throw err;
    }
  },

  get: async apiname => {
    try {
      // headers["Access-Control-Allow-Origin"] = '*'
      // headers.mode = 'cors'
      //const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(APIURL + apiname, {
        method: 'GET',
        headers: headers,
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw err;
    }
  },

  delete: async (apiname,data) => {
    try {
      console.log("data",apiname,data);
      const response = await fetch(APIURL + apiname, {
        method: 'DELETE',
        headers: headers,
        body:JSON.stringify(data)
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw err;
    }
  },
  patch:async(apiname,data)=>{
    try {
      console.log("data",apiname,data);
      const response = await fetch(APIURL + apiname, {
        method: 'PATCH',
        headers: headers,
        body:JSON.stringify(data)
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw err;
    }
  }
};
export default services;
