import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import LoginSignup from "./pages/LoginSignup";
import Data from "./pages/Data";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <ToastContainer position="top-center" />
                <Routes>
                    <Route exact path="/" element={<LoginSignup />} />
                    <Route path="/data" element={<Data />} />
                    <Route path="/addContact" element={<AddEdit />} />
                    <Route path="/update/:id" element={<AddEdit />} />
                    <Route path="/view/:id" element={<View />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
