import * as React from "react";
import { Admin, Resource,} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { Dashboard } from "./component/DashBoard";
// import Product from "./component/product/Product";
import Product_Table from "./component/product/Product_Table";
import User_Table from "./component/user/User_Table";
import GetCatData from "./component/getcategorydata/GetCatData";
import OrderHistory from "./component/order/OrderHistory";
import GetSubCatData from "./component/subcategory/GetSubCatData";
import GetDashBoardImage from "./component/dashboardimage/GetDashBoardImage";
import GetMaterial from "./component/material/GetMaterial";
import BulkUploadProduct from "./component/bulkUploadProduct/BulkUploadProduct";
import Payment from "./component/paymentdetails/Payment";
//import Login from "./component/login/Login";
import TaxManagement from "./component/taxmanagement/TaxManagement";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const auth = false
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name='User' list ={User_Table}/>
    <Resource name='Products' list ={Product_Table}/>
    <Resource name="Category" list ={GetCatData}/>
    <Resource name='SubCategory' list={GetSubCatData}/>
    <Resource name="DashBoardImage" list={GetDashBoardImage}/>  
    <Resource name="Materials" list={GetMaterial}/>
    <Resource name="Order" list={OrderHistory}/>
    <Resource name='BulkUploadProduct' list ={BulkUploadProduct}/>
    <Resource name='PaymentDetails' list={Payment}/>
    <Resource name="TaxManagement" list={TaxManagement}/>
  </Admin>
);

export default App;
