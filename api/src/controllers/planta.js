const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const readAll = async (req, res) => {
    try {
        const plantas = await prisma.planta.findMany();
        res.json(plantas);
    } catch (error) {
        console.error("Erro ao buscar plantas:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const readOne = async (req, res) => {
    const { id } = req.params;
    try {
        const planta = await prisma.planta.findUnique({
            where: { id: Number(id) }
        });
        if (!planta) {
            return res.status(404).json({ error: "Planta não encontrada" });
        }
        res.json(planta);
    } catch (error) {
        console.error("Erro ao buscar planta:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const create = async (req, res) => {
    try {
        const novaPlanta = await prisma.planta.create({
            data: req.body
        });
        res.status(201).json(novaPlanta);
    } catch (error) {
        console.error("Erro ao criar planta:", error);
        res.status(400).json({ error: "Envio de dados inválidos" });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const plantaAtualizada = await prisma.planta.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(plantaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar planta:", error);
        res.status(400).json({ error: "Envio de dados inválidos" });
    }
};

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.planta.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar planta:", error);
        res.status(400).json({ error: "Envio de dados inválidos" });
    }
};

module.exports = {
    readAll,
    readOne,
    create,
    update,
    del
};
