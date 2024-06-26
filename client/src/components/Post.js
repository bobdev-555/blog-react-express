import { useState, useEffect } from "react"

const Post = ({ post, onDelete, onUpdate, editor }) => {
  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(post.content)

  useEffect(() => {
    setEditable(false)
    setContent(post.content)
  }, [post])

  const edit = () => {
    const userId = localStorage.getItem("userId")
    if(parseInt(userId) !== post.user_id) {
      return
    }
    if(editor) {
      setEditable((editable) => !editable)
    }
  }

  const update = (postId) => {
    onUpdate({ postId, content })

    // setContent(post.content)
    setEditable(false)
  }

  return (
    <div className="post" onDoubleClick={edit}>
      <h3>{ post.title }</h3>
      {editable ? <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea> : <p>{ post.content }</p> }
      {editable ? <div className="btn">
        <button id="update" onClick={() => update(post.id)}>Update</button>
        <button id="delete" onClick={() => onDelete(post.id)}>Delete</button>
                  </div> : <></> }
    </div>
  )
}

export default Post
