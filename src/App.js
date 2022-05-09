import * as React from "react";
import { Admin, Resource,} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { Dashboard } from "./component/DashBoard";
// import Product from "./component/product/Product";
import Product_Table from "./component/product/Product_Table";

import GetCatData from "./component/getcategorydata/GetCatData";

import GetSubCatData from "./component/subcategory/GetSubCatData";
import GetDashBoardImage from "./component/dashboardimage/GetDashBoardImage";
import GetMaterial from "./component/material/GetMaterial";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");


const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name='Products' list ={Product_Table}/>
    <Resource name="Category" list ={GetCatData}/>
    <Resource name='SubCategory' list={GetSubCatData}/>
    <Resource name="DashBoardImage" list={GetDashBoardImage}/>  
    <Resource name="Materials" list={GetMaterial}/>
  </Admin>
);

export default App;
