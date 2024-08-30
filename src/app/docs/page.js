'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { findAllByUser } from "@/app/lib/services/DocumentService";
import { getCookie } from "@/app/lib/utils/cookie";
import LoadingSpinner from "../ui/LoadingSpinner";
export default function Docs() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDocuments = async () => {
            const userEmail = getCookie('userEmail');
            if (!userEmail) {
                console.error("Usuário não está logado ou e-mail não encontrado.");
                return;
            }

            try {
                const userDocuments = await findAllByUser(userEmail);
                setDocuments(userDocuments);
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar documentos:", error);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="w-6/12">
                <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {documents.length > 0 ? (
                        documents.map((doc) => (
                            <Link
                                key={doc.id}
                                href={`/docs/${doc.id}`}
                                className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                            >
                                {doc.text.slice(0, 50)}...
                            </Link>
                        ))
                    ) : (
                        <p className="p-4 text-center">Nenhum documento encontrado.</p>
                    )}
                    <div className="p-4 flex justify-center">
                        <Link href="/docs/new">
                            <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Adicionar Novo Documento
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
