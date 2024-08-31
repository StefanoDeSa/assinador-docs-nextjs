'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "@/app/lib/services/DocumentService"; 
import { getCookie } from "@/app/lib/utils/cookie";

export default function NewDocument() {
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = getCookie('userEmail');
        if (!userEmail) {
            console.error("Usuário não está logado ou e-mail não encontrado.");
            return;
        }

        try {
            const newDocument = await createDocument(userEmail, content);
            alert('Documento criado com sucesso!');
            setTimeout(() => {
                router.push('/docs')
            }, 1000);

        } catch (error) {
            console.error("Erro ao criar documento:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-10/12 md:w-6/12 lg:w-4/12">
                <h1 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Documento</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                            Conteúdo do Documento
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows="10"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Salvar Documento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
