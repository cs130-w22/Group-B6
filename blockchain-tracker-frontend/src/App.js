import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";

function App() {
    const [token, setToken] = useState(() => {
        const token = localStorage.getItem("token");
        const initialValue = JSON.parse(token);
        return initialValue || '';
    });

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    return (
        <Fragment>
            <BrowserRouter>
            <Routes>
                { token && <Route element={<Home token={token} setToken={setToken}/>}/> }
                <Route path='/*' element={<Home token={token} setToken={setToken}/>}/>
                <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
                <Route path='/signup' element={<Signup/>} />
            </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default App;
