import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    console.log('fetching data')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = nameObject => {
    console.log('adding data')
  const request = axios.post(baseUrl, nameObject)
  return request.then(response => response.data)
}

const update = (id, nameObject) => {
    console.log('updating data')
  const request = axios.put(`${baseUrl}/${id}`, nameObject)
  return request.then(response => response.data)
}

const deleteObject = (id) => {
    console.log('deleting data')
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteObject: deleteObject
}