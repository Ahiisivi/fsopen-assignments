const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('<h1>Hello from puhelinluettelo backend</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const personsCount = persons.length
    const timeStamp = new Date()
    response.send(`<p>The phonebook has info about ${personsCount} persons</p>
                    <p>The date is: ${timeStamp}</p>`)
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})