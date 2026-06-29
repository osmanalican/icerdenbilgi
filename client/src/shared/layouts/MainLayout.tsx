import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Outlet/>
        </main>
    )
}