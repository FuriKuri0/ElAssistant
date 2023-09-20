import NoteContent from "../components/noteContent"
import NoteUl from "../components/notes"
import Home from "../pages/Home"
import Mask from "../pages/Mask"
import Note from "../pages/Note"

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
      //note
      {
        path:'/note',
        element: <Note />,
    },
    {
        path: '/',
        element: <Home/>,
    },
]
export default routes