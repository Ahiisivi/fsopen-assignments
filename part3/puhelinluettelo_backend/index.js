require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('dist'))

app.get('/api/persons/', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

/* app.get('/info', (request, response) => {
    const personsCount = persons.length
    const timeStamp = new Date()
    response.send(`<p>The phonebook has info about ${personsCount} persons</p>
                    <p>The date is: ${timeStamp}</p>`)
}) */

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Missing name'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Missing number'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})