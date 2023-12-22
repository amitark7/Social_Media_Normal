import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContex } from "../store/Post-store";
import Welcome from "./Welcome";
import LoadingSpinner from "./LoadingSpinner";

function PostList() {
  const { postList, loading } = useContext(PostContex);
  
  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && postList.length === 0 && <Welcome />}
      {!loading && postList.map((item) => {
        return <Post key={item.id} post={item} />
      })}
    </>
  );
};

export default PostList;