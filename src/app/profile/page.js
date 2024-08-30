'use client'
import { useEffect, useState } from "react";
import {getCookie} from "@/app/lib/utils/cookie"
import { findUser } from "../lib/services/UserService";
export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = getCookie('userEmail');
            if (userEmail) {
                console.log('Email do Usuário:', userEmail);
                const userData = await findUser(userEmail);
                setUser(userData);
            } else {
                console.log('Usuário não está logado');
            }
        };

        fetchUserData();
    }, []);
    console.log(user)

    return (

        <div className="grid grid-cols-2 gap-4 p-6">
            <div className="flex items-center justify-center">
                <div class="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-25 h-25 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <button className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Gerar chaves
                    </span>
                </button>
            </div>
        </div>
    )
}