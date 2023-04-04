import { RequireAuth } from './Components/AuthProvider'
import Home from './Components/Home'
import Layout from './Components/Layout'
import Login from './Components/Login'
import Result from './Components/Result'
import SearchMain from './Components/SearchMain'
import Signup from './Components/Signup'
export const routes = [

    {
        path: "/",
        element: <Layout />,
        children:[
            {
                path: "/",
                element:<Home />

            },
            {
                path: "/search",
                element: <RequireAuth><SearchMain /></RequireAuth>
                
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
        
    },
    {
        path: "/signup",
        element: <Signup />
        
    },

]