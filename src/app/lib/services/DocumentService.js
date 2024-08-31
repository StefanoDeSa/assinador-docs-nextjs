'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDocument(userEmail, content) {
    try {
        const document = await prisma.document.create({
            data: {
                userEmail: userEmail,
                text: content,
            },
        });
        console.log("Documento criado com sucesso:", document);
        return document;
    } catch (error) {
        console.error("Erro ao criar documento:", error);
        throw error;
    }
}

export async function findAllByUser(userEmail) {
    try {
        const documents = await prisma.document.findMany({
            where: {
                userEmail: userEmail,
            },
            include: {
                signatures: {
                    where: {
                        userEmail: userEmail,
                    },
                },
            },
        });
        return documents;
    } catch (error) {
        console.error("Erro ao buscar documentos para o usuário:", error);
        throw error;
    }
}


export async function findDocumentById(documentId) {
    try {
        const document = await prisma.document.findUnique({
            where: {
                id: documentId,
            },
            include: {
                signatures: true,
            },
        });

        return document;
    } catch (error) {
        console.error("Erro ao buscar documento por ID:", error);
        throw error;
    }
}