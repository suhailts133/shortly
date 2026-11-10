import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />
            <main className="relative z-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
}