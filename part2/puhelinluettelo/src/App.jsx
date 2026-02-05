import { useState, useEffect } from 'react'
import Name from './components/Names'
import pbServices from './services/persons.js'
import Notification from './components/Notification.jsx'


const Filter = ({value, onChange}) => {
  return (
    <div>Filter with: <input value={value} onChange={onChange}/></div>
  )
}

const PersonForm = ({ onNameChange, onNumberChange, onSubmit, name, number }) => {
  const formStyle = {
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'rgb(47, 93, 219)',
    fontWeight: 'bold'
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange}/>
      </div>
      <div>
          <button style={formStyle} type="submit">Add</button>
      </div>
    </form>
    
  )
}

const Persons = ({ persons, deleteName }) => {
  return (
    <ul>{persons.map(person => 
      <Name 
        key={person.name} 
        name={person.name} 
        number={person.number} 
        deleteName= {() => deleteName(person.id, person.name)}
        />)}</ul>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(() => {
    pbServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    
    if (personExists) {
      if (window.confirm(`${personExists.name} already exists. Do you want to update contact info?`)) {
        
        const changedPerson = {...personExists, number: newNumber}

        pbServices
        .update(personExists.id, changedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === personExists.id ? updatedPerson : person))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Person '${changedPerson.name}' was updated.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        
        .catch(error => {
          console.log(error)
          setSuccessMessage('Error while updating info')
          setPersons(persons.filter(person => person.id !== personExists.id))
        })
    }

    return 
  }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    pbServices
    .create(nameObject)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Person '${nameObject.name}' was added.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
    pbServices
      .deleteObject(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(`Person '${name}' was deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        alert(`The person ${name} has already been deleted`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const filteredPerson = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      <div>
        <Filter value={newFilter} onChange={handleNewFilter} />
      </div>
      <h2>Add new</h2>
      <div>
        <PersonForm name={newName} onNameChange={handleNewName} number={newNumber} onNumberChange={handleNewNumber} onSubmit={addName}/>
      </div>
      
      <h2>Names and Numbers</h2>
        <Persons persons={filteredPerson} deleteName={deleteName}/>
    </div>
  )

}

export default App