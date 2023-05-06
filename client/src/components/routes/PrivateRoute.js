
import Login from "../views/Login/Login"
import PrivateView from "../views/Pages/PrivateView"
//{component: Component , ...rest}

//{component: Component , ...rest}
const PrivateRoute = () =>{
    const authToken = localStorage.getItem('authToken');
    return authToken ? (<PrivateView/>) : (<Login/>)
    
    
}

export default PrivateRoute;