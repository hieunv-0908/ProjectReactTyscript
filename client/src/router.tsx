import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App"
import Register from "./page/Register";
import Login from "./page/Login";
import Manager from "./page/Manager"
import ManagerSubject from "./components/manager/ManagerSubject";
import ManagerLesson from "./components/manager/ManagerLesson";
import Home from "./page/Home";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            { index: true, element: <Navigate to={"/login"} ></Navigate> },
            {
                path: "manager", element: <ProtectedRoute><Manager></Manager></ProtectedRoute>, children: [
                    { path: "subject", element: <ManagerSubject></ManagerSubject> },
                    { path: "lesson", element: <ManagerLesson></ManagerLesson> }
                ]
            },
            { path: "register", element: <Register></Register> },
            { path: "login", element: <Login></Login> },
            { path: "home", element: <ProtectedRoute><Home></Home></ProtectedRoute> },
            { path: "*", element: <Navigate to={"/login"} replace></Navigate> }
        ]
    }
]);

export default router;