const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

//Middleware
function verifyIfExistAccountCPF (request, response, next) {
    const { cpf } = request.headers

    const customer = customers.find((custumer) => custumer.cpf === cpf)

    if(!customer) {
        return response.status(400).json({ error: 'Custumer Not Found' })
    }

    request.customer

    return next()

}

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    //verifica se já existe mesmo cpf cadastrado
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if (custumerAlreadyExists) {
        return response.status(400).json({ error: 'Custumer already exists'})
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send()
})

app.get('/statement/', verifyIfExistAccountCPF, (request, response) => {
    return response.json(customer.statement)
})

app.listen(3333)