'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findDocumentById } from "@/app/lib/services/DocumentService";
import LoadingSpinner from "@/app/ui/LoadingSpinner";

export default function Doc({ params }) {
    const [document, setDocument] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const documentData = await findDocumentById(params.id);
                if (documentData) {
                    setDocument(documentData);
                } else {
                    console.error("Documento não encontrado.");
                    router.push('/docs');
                }
            } catch (error) {
                console.error("Erro ao buscar documento:", error);
                router.push('/docs');
            }
        };

        fetchDocument();
    }, [params.id]);

    if (!document) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="w-6/12 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Documento</h1>
                <textarea
                    readOnly
                    value={document.text}
                    rows={10}
                    className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => router.push('/docs')}
                        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => console.log('Assinar documento')}
                        className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Assinar
                    </button>
                </div>
            </div>
        </div>
    );
}
