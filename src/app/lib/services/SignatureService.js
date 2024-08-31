'use server'
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function signDocument(documentId, userEmail) {
    try {
       
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user || !user.privateKey) {
            throw new Error("Usuário não encontrado ou chave privada não disponível.");
        }

        
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error("Documento não encontrado.");
        }

        // Converter a chave privada para o formato correto
        const privateKey = `-----BEGIN PRIVATE KEY-----\n${user.privateKey.match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----`;
        console.log('-------------------')
        console.log(privateKey)
        console.log('-------------------')


        
        const signer = crypto.createSign('RSA-SHA256');
        signer.update(document.text);
        signer.end();

        const signature = signer.sign(privateKey, 'base64');

        
        const hash = crypto.createHash('sha256').update(signature).digest('hex');

        
        const savedSignature = await prisma.signature.create({
            data: {
                documentId: document.id,
                userEmail: user.email,
                signature: signature,
                hash: hash,
            },
        });

        console.log("Assinatura salva com sucesso:", savedSignature);
        return savedSignature;
    } catch (error) {
        console.error("Erro ao assinar documento:", error);
        throw error;
    }
}

export async function verifyDocument(signatureHash, documentText, publicKey) {
    try {
        const signatureRecord = await prisma.signature.findFirst({
            where: { hash: signatureHash },
            include: { document: true },
        });

        if (!signatureRecord) {
            throw new Error("Assinatura não encontrada.");
        }

        const { signature, document } = signatureRecord;

        if (document.text !== documentText) {
            throw new Error("O texto do documento fornecido não corresponde ao texto assinado.");
        }

        // Converter a chave pública para o formato correto
        const formattedPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;

        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(documentText);
        verifier.end();

        const isVerified = verifier.verify(formattedPublicKey, signature, 'base64');

        return { isVerified, signatureRecord };
    } catch (error) {
        console.error("Erro ao verificar documento:", error);
        throw error;
    }
}
