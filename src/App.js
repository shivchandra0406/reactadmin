import * as React from "react";
import { Admin, EditGuesser, Resource,} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./component/UserList";
import {PostList} from './component/Post.jsx';
import { PostEdit } from "./component/PostEdit";
import { PostCreate } from "./component/PostCreate";
import { Dashboard } from "./component/DashBoard";
// import Product from "./component/product/Product";
import Product_Table from "./component/product/Product_Table";

import GetCatData from "./component/getcategorydata/GetCatData";

import GetSubCatData from "./component/subcategory/GetSubCatData";
import AddDashBoardImage from "./component/dashboardimage/AddDashBoardImage";
import GetDashBoardImage from "./component/dashboardimage/GetDashBoardImage";
import AddMaterial from "./component/material/AddMaterial";
import GetMaterial from "./component/material/GetMaterial";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");


const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
    <Resource name='Products' list ={Product_Table}/>
    <Resource name="Category" list ={GetCatData}/>
    <Resource name='SubCategory' list={GetSubCatData}/>
    <Resource name='AddDashBoardImage' list={AddDashBoardImage}/>
    <Resource name="GetDashBoardImages" list={GetDashBoardImage}/>  
    <Resource name="AddMaterial" list={AddMaterial}/>
    <Resource name="GetMaterials" list={GetMaterial}/>
  </Admin>
);

export default App;
