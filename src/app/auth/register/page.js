
'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { createUser } from "@/app/lib/services/UserService";
import Link from "next/link";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await createUser(email, password);
            alert('Usuário registrado com sucesso!');
            setTimeout(() => {
                router.push('login')
            }, 1000);
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro ao registrar usuário. Tente novamente.");
        }
    };



    return (

        <div className="min-h-screen flex items-center justify-center">
            <form className="max-w-sm w-full" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Registro</h2>
                <div className="mb-5">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
                    <input 
                        type="email"
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@flowbite.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    required 
                    />
                </div>
                <p id="helper-text-explanation" className="mt-2 mb-7 text-sm text-gray-500 dark:text-gray-400">Caso tenha uma conta, faça o seu <Link href="login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</Link>.</p>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
            </form>
        </div>


    )
}