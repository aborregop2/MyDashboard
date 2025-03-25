import { Navigate, Outlet } from "react-router";


export default function RedirectAuthenticatedRoute({route}: {route: string}) {
    const user = localStorage.userStorage;

    if (user) {
        return <Navigate to={route} replace />
    }

    return <Outlet />
}