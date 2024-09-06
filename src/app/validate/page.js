'use client'
import { useState } from 'react';
import { verifyDocument } from '../lib/services/SignatureService';

export default function Validate() {
    const [documentText, setDocumentText] = useState('');
    const [signatureHash, setSignatureHash] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [signature, setSignature] = useState(null);

    const handleValidation = async (event) => {
        event.preventDefault();

        try {
            const { isVerified, signatureRecord } = await verifyDocument(signatureHash, documentText, publicKey);

            if (isVerified) {
                alert("Assinatura verificada com sucesso!");
                setSignature(signatureRecord);
            } else {
                alert("Falha na verificação da assinatura.");
                setSignature(null);
            }
        } catch (error) {
            console.error("Erro ao validar assinatura:", error);
            alert("Erro ao validar a assinatura. Tente novamente.");
            setSignature(null);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Validar Assinatura</h1>

                <form onSubmit={handleValidation}>
                    <div className="mb-4">
                        <label htmlFor="documentText" className="block mb-2 text-sm font-medium text-gray-900">
                            Texto do Documento
                        </label>
                        <textarea
                            id="documentText"
                            rows="4"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Insira o texto do documento"
                            value={documentText}
                            onChange={(e) => setDocumentText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="signatureHash" className="block mb-2 text-sm font-medium text-gray-900">
                            Hash da Assinatura
                        </label>
                        <input
                            type="text"
                            id="signatureHash"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Insira o hash da assinatura"
                            value={signatureHash}
                            onChange={(e) => setSignatureHash(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="publicKey" className="block mb-2 text-sm font-medium text-gray-900">
                            Chave Pública
                        </label>
                        <textarea
                            id="publicKey"
                            rows="4"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Insira a chave pública"
                            value={publicKey}
                            onChange={(e) => setPublicKey(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Validar
                    </button>
                </form>

                {signature && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 my-2">
                            <strong>Assinado por:</strong> {signature.userEmail}
                        </p>
                        <p className="text-sm text-gray-700 my-2 break-words">
                            <strong>Assinatura:</strong> {signature.signature}
                        </p>
                        <p className="text-sm text-gray-700 my-2 break-words">
                            <strong>Hash da assinatura:</strong> {signature.hash}
                        </p>
                        <p className="text-sm text-gray-700 my-2">
                            <strong>Assinado em:</strong>{" "}
                            {new Date(signature.signedAt).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
