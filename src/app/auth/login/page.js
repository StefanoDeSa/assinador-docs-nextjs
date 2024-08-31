'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { findUser } from "@/app/lib/services/UserService";
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await findUser(email);

            if (user && user.password === password) {
                document.cookie = `userEmail=${user.email}; path=/;`;
                
                alert('Usuário logado com sucesso!');
                setTimeout(() => {
                    router.push('/profile?reload=true');
                }, 1000);
            } else {
                setError('Email ou senha incorretos');
            }
        } catch (err) {
            console.error('Erro durante o login:', err);
            setError('Erro durante o login, tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="max-w-sm w-full" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
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
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p id="helper-text-explanation" className="mt-2 mb-7 text-sm text-gray-500 dark:text-gray-400">Caso ainda não tenha uma conta, faça o seu <Link href="register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Registro</Link>.</p>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
        </div>
    );
}
