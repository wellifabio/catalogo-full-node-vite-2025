const express = require("express");
const routes = express.Router();

routes.get("/",(req, res)=>{
    res.json({
        message: "API de Plantas",
        routes:[
            { method: "GET", path: "/plantas", description: "Listar todas as plantas" },
            { method: "GET", path: "/plantas/:id", description: "Buscar planta por ID" },
            { method: "POST", path: "/plantas", description: "Criar nova planta" },
            { method: "PATCH", path: "/plantas/:id", description: "Atualizar planta por ID" },
            { method: "DELETE", path: "/plantas/:id", description: "Deletar planta por ID" }
        ]
    });
})

const Planta = require("./controllers/planta");

routes.get("/plantas", Planta.readAll);
routes.get("/plantas/:id", Planta.readOne);
routes.post("/plantas", Planta.create);
routes.patch("/plantas/:id", Planta.update);
routes.delete("/plantas/:id", Planta.del);

module.exports = routes;