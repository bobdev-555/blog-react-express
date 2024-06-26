import React from 'react'
import SignPanel from "../components/SignPanel"
import { useNavigate, Link } from 'react-router-dom'

const SignOption = () => {
    const navigate = useNavigate();
    const signUpUser = async ({name, password}) => {
        console.log(JSON.stringify({ name, password }))
        const res = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        alert(data.message)
      }
    
      const signInUser = async ({name, password}) => {
        console.log(JSON.stringify({ name, password }))
        const res = await fetch('http://localhost:5000/api/users/signin', {
          method: 'POST',
          body: JSON.stringify({ name, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        if(data.data.length > 0) {
          localStorage.setItem("token", data.data)
          localStorage.setItem("userId", data.uId)
          navigate("/blog");
        } else {
          alert("Please sign-up first")
        }
      }

  return (
    <div className='sign'>
      <SignPanel signup={signUpUser} signin={signInUser}/>
      <Link to={'/'}>Go Home</Link>
    </div>
  )
}

export default SignOption
