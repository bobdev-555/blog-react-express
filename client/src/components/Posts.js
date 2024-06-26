import Post from "./Post"

const Posts = ({ posts, onDelete, onUpdate, edit }) => {
  return (
    <div>
      {posts.length !== 0 ? posts.map((rows, index) => <Post key={index} post={rows} onDelete={onDelete} onUpdate={onUpdate} editor={edit} />) : <p>Sorry, no post to show!</p> }
      {}
    </div>
  )
}

export default Posts