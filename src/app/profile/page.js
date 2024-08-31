'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { getCookie } from "@/app/lib/utils/cookie";
import { findUser, updateUserWithKeys } from "../lib/services/UserService";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {

        const reload = searchParams.get('reload');
        if (reload) {
            window.location.replace('/profile');
            return;
        }


        const fetchUserData = async () => {
            const userEmail = getCookie('userEmail');
            if (userEmail) {
                console.log('Email do Usuário:', userEmail);
                const userData = await findUser(userEmail);
                setUser(userData);
            } else {
                console.log('Usuário não está logado');
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const generateRSAKeys = async () => {
        try {
            const keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: 2048,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            );

            const publicKey = await window.crypto.subtle.exportKey(
                "spki",
                keyPair.publicKey
            );
            const privateKey = await window.crypto.subtle.exportKey(
                "pkcs8",
                keyPair.privateKey
            );

            const userEmail = getCookie('userEmail');
            await updateUserWithKeys(userEmail, Buffer.from(publicKey).toString('base64'), Buffer.from(privateKey).toString('base64'));

            console.log("Chaves RSA geradas e armazenadas com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao gerar ou salvar as chaves RSA:", error);
        }
    };


    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-6">
            <div className="flex items-center justify-center">
                <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-25 h-25 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                {!user?.privateKey && (
                    <button
                        onClick={generateRSAKeys}
                        className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Gerar chaves
                        </span>
                    </button>
                )}

                {user.publicKey && (

                    <div className="w-6/12 mt-5">
                        <label htmlFor="public-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chave Pública</label>
                        <textarea
                            id="public-key"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={user.publicKey}
                            readOnly
                        />
                    </div>

                )}

            </div>
        </div>
    );
}
