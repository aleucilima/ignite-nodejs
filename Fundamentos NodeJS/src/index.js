//Exportar o EXPRESS
const express = require('express')

//Utiliza a função do EXPRESS
const app = express()

app.use(express.json())

//Busca GET
app.get("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

//Inserção POST
app.post("/courses", (request, response) => { 
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"])
})

//Alteração total PUT
app.put("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"])
})

//Alteração parcial PATCH
app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 8", "Curso 3", "Curso 4"])
})

//Delete DELETE
app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 3", "Curso 4"])
})

//Porta do servidor localhost:3333
app.listen(3333)