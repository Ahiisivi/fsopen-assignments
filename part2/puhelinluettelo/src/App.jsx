import { useState } from 'react'
import Name from './components/Names'

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
const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    
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