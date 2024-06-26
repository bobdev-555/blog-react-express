import React from 'react'
import { useState } from 'react'

const BlogEditor = ({onBlog, singout}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const upload = (e) => {
    e.preventDefault()

    if(title.length <= 0) {
        alert("Type your blog")
        return
    }

    onBlog({title, content})

    setTitle("")
    setContent("")
  }

  return (
    <div className='blogEditor'>
        <label>Your title here:</label>
        <input type='text' placeholder='Type your title'
        value={title} onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <div className='btn'>
            <button onClick={upload}>Upload</button>
        </div>
        <div className='btn'>
            <button onClick={singout}>Sign Out!</button>
        </div>
    </div>
  )
}

export default BlogEditor
