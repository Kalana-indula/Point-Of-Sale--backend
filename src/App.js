import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddItem from "./pages/AddItem";
import Navbar from "./pages/Navbar";
import AllItems from "./pages/AllItems";
import Actions from "./pages/Actions";
import UpdateItem from "./pages/UpdateItem";
import DeleteItem from "./pages/DeleteItem";
import UpdateStock from "./pages/UpdateStock";
import AddCategory from "./pages/AddCategory";
import UpdateCategory from "./pages/UpdateCategory";
import DeleteCategory from "./pages/DeleteCategory";
import RegisterUser from "./pages/auth/RegisterUser";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
    return (
        <>
            <div className="application-body">
                <BrowserRouter>
                    <div className="header-section">
                        <Navbar/>
                    </div>
                    <div className="body-section">
                        <Routes>
                            <Route index element={<Home/>}/>

                            <Route element={<ProtectedRoutes/>}>
                                <Route path="/add-item" element={<AddItem/>}/>
                                <Route path="/update-item" element={<UpdateItem/>}/>
                                <Route path="/delete-item" element={<DeleteItem/>}/>
                                <Route path="/update-stock" element={<UpdateStock/>}/>
                                <Route path="/add-category" element={<AddCategory/>}/>
                                <Route path="/update-category" element={<UpdateCategory/>}/>
                                <Route path="/delete-category" element={<DeleteCategory/>}/>
                            </Route>

                            <Route path="/allitems" element={<AllItems/>}/>
                            <Route path="/actions" element={<Actions/>}/>
                            <Route path="/register-user" element={<RegisterUser/>}/>
                            <Route path="/login/user" element={<Login/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
