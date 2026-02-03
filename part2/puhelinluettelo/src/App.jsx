import { useState, useEffect } from 'react'
import Name from './components/Names'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <div>Filter with: <input value={value} onChange={onChange}/></div>
  )
}

const PersonForm = ({ onNameChange, onNumberChange, onSubmit, name, number }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange}/>
      </div>
      <div>
          <button type="submit">add</button>
      </div>
    </form>
    
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>{persons.map(person => <Name key={person.name} name={person.name} number={person.number} />)}</ul>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // exercise 2.11 using effect hook and axios library to fetch the data from json server
  useEffect(() => {
    console.log('fetcing data')
  
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('data fetched')
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} already added to phonebook`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    //setPersons(persons.concat(nameObject))
    // 2.12 sending and saving data to server
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
              setNewName('')
              setNewNumber('')
      })

    
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
      <div>
        <Filter value={newFilter} onChange={handleNewFilter} />
      </div>
      <h2>Add new</h2>
      <div>
        <PersonForm name={newName} onNameChange={handleNewName} number={newNumber} onNumberChange={handleNewNumber} onSubmit={addName}/>
      </div>
      
      <h2>Names and Numbers</h2>
        <Persons persons={filteredPerson}/>
    </div>
  )

}

export default App