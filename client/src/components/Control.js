const Control = ({getposts, getUserPos}) => {
  return (
    <div className="control">
      <button id="control-btn" onClick={getposts}>Get All Posts</button>
      <button id="control-btn" onClick={getUserPos}>Get Your Posts & Edit</button>
    </div>
  )
}

export default Control
