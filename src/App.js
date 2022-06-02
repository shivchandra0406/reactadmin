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
import TaxManagement from "./component/taxmanagement/TaxManagement";
import DeliveryCharges from "./component/deliveryCharges/DeliveryCharges";
import Faq from "./component/faq/Faq";
import AuthProvider from "./component/AuthProvider";
import Login from "./component/login/Login";
import {AiOutlineUsergroupAdd,AiFillGolden} from 'react-icons/ai'
import {FcAddDatabase,FcFaq,FcPackage,FcImageFile,FcDeployment,FcComboChart} from 'react-icons/fc'
import {BiCategory} from 'react-icons/bi'
import {MdShoppingCart} from 'react-icons/md'
import {GrDeliver} from 'react-icons/gr'
import {SiMicrosoftexcel} from 'react-icons/si'
import GetNotification from './component/notification/GetNotification'
const dataProvider = jsonServerProvider("http://51.15.201.39:3002/");
const tax = require('./assert/tax.png')


const App = () => {
  return(
  <Admin dashboard={Dashboard} dataProvider={dataProvider} loginPage={Login} authProvider={AuthProvider} requireAuth>
    <Resource name='User' list ={User_Table} icon={AiOutlineUsergroupAdd}/>
    <Resource name='Products' list ={Product_Table} icon={FcAddDatabase}/>
    <Resource name="Category" list ={GetCatData} icon={BiCategory} />
    <Resource name='SubCategory' list={GetSubCatData} icon={FcPackage} options={{ label: 'Sub Category' }}/>
    <Resource name="DashBoardImage" list={GetDashBoardImage} icon={FcImageFile} options={{ label: 'DashBoard Images' }}/>  
    <Resource name="Materials" list={GetMaterial} icon={AiFillGolden}/>
    <Resource name="Order" list={OrderHistory} icon={MdShoppingCart}/>
    <Resource name='BulkUploadProduct' list ={BulkUploadProduct} icon={SiMicrosoftexcel} options={{ label: 'BulkUpload Products' }}/>
    <Resource name='PaymentDetails' list={Payment} icon={FcDeployment} options={{ label: 'Payment Details' }}/>
    <Resource name="TaxManagement" list={TaxManagement} icon={FcComboChart} options={{ label: 'Taxes Managements' }}/>
    <Resource name="DeliveryCharges" list={DeliveryCharges} icon={GrDeliver} options={{ label: 'Delivery Charges' }}/>
    <Resource name="Faq" list={Faq} icon={FcFaq}/>
    <Resource name = "Notifications" list={GetNotification}/>
  </Admin>
);
}

const logOut = () =>{
   localStorage.removeItem('@logingDetails')
}

export default App;
