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

