import Post from "./Post"

const Posts = ({ posts, onDelete, onUpdate }) => {
  return (
    <div>
      {posts.map((rows, index) => <Post key={index} post={rows} onDelete={onDelete} onUpdate={onUpdate} />)}
    </div>
  )
}

export default Posts
