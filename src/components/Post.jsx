import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostContex } from "../store/Post-store";
function Post({ post }) {
  const {handleDelete}=useContext(PostContex)
  return (
    <div className="card post" style={{ width: "18rem" }} >
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>handleDelete(post.id)}>
          <MdDelete />
        </span>
        {post.tags?.map((tag) => <span key={tag} className="badge text-bg-primary tag">#{tag}</span>)}
        <div className="alert alert-success reactions">
          Your Post Has Reacted by {post.reactions} peoples.
        </div>
      </div>
    </div>
  )
}

export default Post;