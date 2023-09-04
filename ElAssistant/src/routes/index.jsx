import Home from "../pages/Home"
import Mask from "../pages/Mask"
const routes = [
    //mmd + clock
    {
        path:'/home',
        element: <Home />,
    },
    //mask
    {
        path:'/mask',
        element: <Mask />,
    },
    {
        path: '/',
        element: <Home/>,
    },
]
export default routes