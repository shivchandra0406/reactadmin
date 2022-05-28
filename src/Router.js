import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login/Login'
import App from './App'

export default function Router() {
    return (
      <BrowserRouter>
        <Routes >
               <Route path="/login" element={<Login />} ></Route>
               <Route path="/p" element={<App/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }