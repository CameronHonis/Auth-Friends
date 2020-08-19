import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../axiosBuilds'

const initialFormData = {
  name: '',
  age: '',
  email: '',
}

export const FriendsList = props => {
  const [ friends, setFriends ] = useState([])
  const [ formData, setFormData ] = useState(initialFormData)

  useEffect(() => {
    axiosWithAuth()
      .get('/api/friends')
      .then(res => {
        setFriends(res.data)
      })
  },[])

  const submitForm = e => {
    e.preventDefault()
    setFormData(initialFormData)
    axiosWithAuth()
      .post('/api/friends', formData)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })
  }

  let key = 0
  return(
    <div className='friends'>
      <form>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder='Friend Name'
        ></input>
        <input
          type='text'
          name='age'
          value={formData.age}
          onChange={e => setFormData({...formData, age: e.target.value})}
          placeholder='Friend Age'
        ></input>
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        ></input>
        <button onClick={e => submitForm(e)}>Add</button>
      </form>
      {friends.map(v => {
        return(
          <div key={key++}>
            <h2>{v.name}</h2>
            <p>age: {v.age}</p>
            <p>email: {v.email}</p>
          </div>
        )
      })}
      
    </div>
  )
}