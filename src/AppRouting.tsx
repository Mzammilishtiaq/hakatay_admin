import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminContainer from "./Containers/AdminContainer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Message from "./Pages/Message/Message";

const routes = [
    {
        path: '/',
        component: <AdminContainer />,
        children: [
            {
                path: '',
                component: <Dashboard />,
            },
            {
                path: '/message',
                component: <Message />,
            }
        ]
    }
]

function AppRouting() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, component, children }) => (
                    <Route key={Math.random()} path={path} element={component} >
                        {children && children?.map(({ path, component }) => (
                            <Route key={Math.random()} path={path} element={component} />
                        ))}
                    </Route>
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouting