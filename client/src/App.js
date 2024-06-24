import Header from "./components/Header"
import Control from "./components/Control"
import Posts from "./components/Posts"
import SignPanel from "./components/SignPanel"
import BlogEditor from "./components/BlogEditor"
import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      await fetchPosts()
      if(localStorage.getItem('token') !== null) {
        setSigned(true)
      }
    }
    getPost()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts/all')
    console.log(res)
    const data = await res.json()
    setPosts(data)
  }

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/posts', {
      headers: {
        'gfg_token_header_key': localStorage.getItem('token')
      } 
    })
    const data = await res.json()
    setPosts(data)
  }

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
    localStorage.setItem("token", data.data)
    localStorage.setItem("userId", data.uId)
    if(data.data.length > 0) {
      setSigned(true)
    } else {
      alert("Please sign-up first")
    }
  }

  const onBlog = async ({title, content}) => {
    await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
        'gfg_token_header_key': localStorage.getItem('token')
      }
    })
    fetchUsers()
  }

  const deletePost = async (postID) => {
    await fetch(`http://localhost:5000/api/posts/${postID}`, {
      method: 'DELETE',
      // body: JSON.stringify({ id: postID }),
      headers: {
        'Content-Type': 'application/json',
        'gfg_token_header_key': localStorage.getItem('token')
      }
    })
    fetchUsers()
  }

  const updatePost = async ({ postId, content }) => {
    await fetch('http://localhost:5000/api/posts', {
      method: 'PUT',
      body: JSON.stringify({ postId, content }),
      headers: {
        'Content-Type': 'application/json',
        'gfg_token_header_key': localStorage.getItem('token')
      }
    })
    fetchUsers()
  }

  const signout = () => {
    localStorage.clear()
    setSigned(false)
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
      <Posts posts={posts} onDelete={deletePost} onUpdate={updatePost}/>
        <div className="controller">
          {signed ? <></> : <SignPanel signup={signUpUser} signin={signInUser}/> }
          {signed ? <Control getposts={fetchPosts} getUserPos={fetchUsers}/> : <></> }
          {signed ? <BlogEditor onBlog={onBlog} singout={signout}/> : <></> }
        </div>
      </div>
    </div>
  );
}

export default App;
