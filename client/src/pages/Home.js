import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <h1>Welcom to BLOG POST</h1>
      <Link to={"/sign"}>Go to Sign Option</Link>
    </div>
  )
}

export default Home
