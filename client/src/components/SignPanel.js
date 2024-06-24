import React from 'react'
import { useState } from 'react'

const SignPanel = ({ signup, signin }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const onUp = (e) => {
    e.preventDefault()

    if(name.length <= 0) {
        alert("Please type your Info")
        return
    }

    signup({name, password})

    setName("")
    setPassword("")
    setConfirm("")
  }

  const onIn = (e) => {
    e.preventDefault()

    if(name.length <= 0) {
        alert("Please type your Info")
        return
    }

    signin({name, password})

    setName("")
    setPassword("")
    setConfirm("")
  }

  return (
    <form className='signOption'>        
      <label>User name</label>
      <input type='text' placeholder='Type your name, please' 
      value={name} onChange={(e) => setName(e.target.value)} ></input>

      <label>User password</label>
      <input type='text' placeholder='Type your password, please' 
      value={password} onChange={(e) => setPassword(e.target.value)} ></input>

      <input type='text' placeholder='Confirm your password' 
      value={confirm} onChange={(e) => setConfirm(e.target.value)} ></input>

      {password === confirm ? <></> : <p>* Confirm your password *</p>}
      {password === confirm ? <button onClick={onUp}>Sign Up</button> : <></>}
      {password === confirm ? <button onClick={onIn}>Sign In</button> : <></>}
    </form>
  )
}

export default SignPanel
