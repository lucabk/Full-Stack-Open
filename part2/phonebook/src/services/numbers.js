import axios from 'axios'

const baseUrl = '/api/persons'

/*The module returns an object that has three functions (getAll, create, 
and update).The functions directly return the response.data 
returned by the axios methods*/

//GET
const getAll = () => {
    /*We no longer return the promise returned by axios directly. Instead, 
    we assign the promise to the request variable and call its then method*/
    const request = axios.get(baseUrl)
    /*returns a promise, as the then method of a promise also 
    returns a promise*/
    return request.then(response => {
      return response.data
    })
  }
  

  //POST
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  

//DELETE
const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

//PUT (back-ticks defines the unique URL for each note based on its id)
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  
  export default { 
    getAll, 
    create,
    deleteNumber,
    update
  }