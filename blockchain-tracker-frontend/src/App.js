import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Home/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
            </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default App;
