import { useState } from 'react'

  const Name = (props) => {
    return (
      <li>{props.name}, {props.number}</li>

    )
  }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'0441234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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
        Filter with: <input value={newFilter} onChange={handleNewFilter}/>
      </div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPerson.map(person => <Name key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </div>
  )

}

export default App