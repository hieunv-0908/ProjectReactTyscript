import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Register from "./page/Register";
import Login from "./page/Login";
import Manager from "./page/Manager"
import ManagerSubject from "./components/manager/ManagerSubject";
import ManagerLesson from "./components/manager/ManagerLesson";
import Home from "./page/Home";
const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            {
                path: "manager", element: <Manager></Manager>, children: [
                    { path: "subject", element: <ManagerSubject></ManagerSubject> },
                    { path: "lesson", element: <ManagerLesson></ManagerLesson> }
                ]
            },
            { path: "register", element: <Register></Register> },
            { path: "login", element: <Login></Login> },
            {path:"home",element:<Home></Home>}
        ]
    }
]);

export default router;