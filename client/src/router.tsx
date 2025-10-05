import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Register from "./page/Register";
import Login from "./page/Login";
import Manager from "./page/Manager"
import ManagerSubject from "./components/manager/ManagerSubject";
const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            {
                path: "manager", element: <Manager></Manager>, children: [
                    { path: "subject", element: <ManagerSubject></ManagerSubject> }
                ]
            },
            { path: "register", element: <Register></Register> },
            { path: "login", element: <Login></Login> }
        ]
    }
]);

export default router;