import prisma from "../config/prisma"


export const listExchange = async()=>{
    const list = await prisma.exchange.findMany();

    return list
}