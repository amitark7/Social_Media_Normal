import { useContext } from "react";
import { PostContex } from "../store/Post-store";
import { Form, redirect } from "react-router-dom";


function CreatePost() {
  const { handleAdd } = useContext(PostContex);
  return (
    <Form method="POST" className="create-post">
      <h1 className="create-post-header">Create New Post</h1>
      <div className="mb-3">
        <label htmlFor="user" className="form-label">User Id</label>
        <input type="text" name="userId" className="form-control" id="user" placeholder="Enter Your UserID Here" />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Post Title</label>
        <input type="text" name="title" className="form-control" id="title" placeholder="How was your feeling today.."/>
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Post Content</label>
        <textarea name="body" className="form-control" id="desc" rows="3" style={{ resize: 'none' }} placeholder="Tell me more about it" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input type="text" name="tags" className="form-control" id="tags" placeholder="Enter Your Tags With Space.." />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">Reactions</label>
        <input type="text" name="reactions" className="form-control" id="reactions" placeholder="How many people reacted on your post" />
      </div>
      <div className="create-post-btn">
        <button type="submit">Add Post</button>
      </div>
    </Form>
  )
}

export async function createPostAction(data){
  const formData=await data.request.formData();
  const postData=Object.fromEntries(formData);
  postData.tags=postData.tags.split(" ")
  console.log(postData)
  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  }).then(res => res.json())
  .then(post=>handleAdd(post));

  return redirect('/')
}
export default CreatePost;
