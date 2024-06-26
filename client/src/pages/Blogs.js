import React from 'react'
import Control from "../components/Control"
import Posts from "../components/Posts"
import BlogEditor from "../components/BlogEditor"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Select from 'react-select'

const Blogs = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    const getPost = async () => {
      await fetchPosts()
    }
    getPost()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts/all')
    console.log(res)
    const data = await res.json()
    setPosts(data)
    setEdit(false)
  }

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/posts', {
      headers: {
        'gfg_token_header_key': localStorage.getItem('token')
      } 
    })
    const data = await res.json()
    console.log(data)
    setPosts(data)
    setEdit(true)
  }

//   const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]


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
    navigate("/")
  }



  return (
    <div>
      <div className="container">
      {/* <Select options={options} /> */}
      <Posts posts={posts} onDelete={deletePost} onUpdate={updatePost} edit={edit} />
        <div className="controller">
          <Control getposts={fetchPosts} getUserPos={fetchUsers}/>
          <BlogEditor onBlog={onBlog} singout={signout}/>
        </div>
      </div>
    </div>
  )
}

export default Blogs
