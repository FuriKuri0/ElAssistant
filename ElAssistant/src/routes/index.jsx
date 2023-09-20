<<<<<<< HEAD
import NoteContent from "../components/noteContent"
import NoteUl from "../components/notes"
import Home from "../pages/Home"
import Mask from "../pages/Mask"
import Note from "../pages/Note"

=======
import Home from "../pages/Home"
import Mask from "../pages/Mask"
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
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
<<<<<<< HEAD
      //note
      {
        path:'/note',
        element: <Note />,
    },
=======
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
    {
        path: '/',
        element: <Home/>,
    },
]
export default routes