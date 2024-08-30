'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function findUser(email){

    const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })

    return user
      
}

export async function createUser(email, password) {
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
            },
        });
        return console.log(`Usuário ${user.email} criado`);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
}

export async function updateUserWithKeys(userEmail, publicKey, privateKey) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                publicKey: publicKey,
                privateKey: privateKey,
            },
        });

        console.log(`Chaves RSA atualizadas para o usuário: ${updatedUser.email}`);
        return updatedUser;
    } catch (error) {
        console.error("Erro ao atualizar as chaves RSA do usuário:", error);
        throw error;
    }
}

