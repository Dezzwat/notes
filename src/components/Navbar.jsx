"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";



const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href= "/login"
    };
    
    return (
        
        <div className="bg-slate-900">
            <div className=" mx-auto max-w-screen-lg p-4">
                <div className=" flex justify-between items-center  w-full">
                    <h1 className=" text-yellow-300 font-bold text-3xl">NotesApp </h1>
                    <nav className="">
                        <ul className="flex gap-6">
                            <li className="text-white font-medium text-md"><Link href={"/"}>Beranda</Link> </li>
                            <li className="text-white font-medium text-md"><Link href={"/Notes"}>List Catatan</Link></li>
                            <li className="text-white font-medium text-md"><Link href={"/Notes/Create"}>Create Notes</Link></li>
                            <li className="text-white font-medium text-md"><Link href={"/about"}>About Me</Link></li>
                            {isLoggedIn ? (
                                <li className="text-black font-medium text-md ">
                                    <Link href={"/login"}>
                                        <Button onClick={handleLogout} className="text-black bg-white hover:bg-gray-400">Logout</Button>
                                    </Link>
                                </li>

                            ) : (
                                <div className="flex gap-4">
                                    <li className="text-white font-medium text-md ">
                                        <Link href={"/login"}>
                                            <Button className="bg-yellow-300 hover:bg-yellow-200">Login</Button>
                                        </Link>
                                    </li>
                                    <li className="text-black font-medium text-md ">
                                        <Link href={"/register"}>
                                            <Button className="text-black bg-white hover:bg-gray-400">Register</Button>
                                        </Link>
                                    </li>
                                </div>
                            )}


                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Navbar;