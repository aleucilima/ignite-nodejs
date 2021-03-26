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

    request.customer = customer

    return next()

}

function getBalance (statement) {
    const balance = statement.reduce((acc, operator) => {
        if(operation.type === 'credit') {
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0)

    return balance
}

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    //verifica se já existe mesmo cpf cadastrado
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if (customerAlreadyExists) {
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
    const { customer } = request

    return response.json(customer.statement)
})

app.post('/deposit/', verifyIfExistAccountCPF, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    const statementOperation = {
        description,
        amount,
        create_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.post('/withdraw', verifyIfExistAccountCPF, (request, response) => {
    const { amount } = request.body
    const { customer } = request

    const balance = getBalance(customer.statement)

    if (balance < amount) {
        return response.status(400).json({ error: 'Insufficient funds!'})
    }

    const statementOperation = {
        amount,
        create_at: new Date(),
        type: 'debit'
    }

    custumer.statement.push(statementOperation)

    return response.status(201).send()
})
app.listen(3333)