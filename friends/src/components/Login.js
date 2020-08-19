import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialFormData = {
  username: '',
  password: '',
}

const Login = props => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ formData, setFormData ] = useState(initialFormData)

  const history = useHistory()
  
  const sumbitForm = e => {
    e.preventDefault()
    setIsLoading(true)
    axios.post('http://localhost:5000/api/login', formData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token',res.data.payload)
        setIsLoading(false)
        history.push('/friends')
      })
      .catch(err => {
        debugger
      })
  }
  return(
    <form>
      <input
        type='text'
        name='username'
        value={formData.username}
        onChange={e => setFormData({...formData, username: e.target.value})}
        placeholder='Username'
      ></input>
      <input
        type='password'
        name='password'
        value={formData.password}
        onChange={e => setFormData({...formData, password: e.target.value})}
        placeholder='Password'
      ></input>
      <button onClick={e => sumbitForm(e)}>Submit</button>
    </form>
  )
}
export default Login