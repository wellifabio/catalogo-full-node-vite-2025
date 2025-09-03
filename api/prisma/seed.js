const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

//Importando os dados de arquivo csv para variáveis
const plantas = require("./plantas.json");

async function main() {
    for (const planta of plantas) {
        await prisma.planta.create({
            data: planta
        });
    }
}

//Executando a função main
main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Seed complete');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });