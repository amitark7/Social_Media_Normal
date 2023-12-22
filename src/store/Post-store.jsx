import { createContext, useEffect, useReducer, useState } from "react";

export const PostContex=createContext({
  postList:[],
  loading:false,
  handleAdd:()=>{},
  handleDelete:()=>{},
});

const PostReducer=(currState,action)=>{
  let postList=currState;
  if(action.type==='NEW_POST'){
    postList=[action.post,...currState]
  }else if(action.type==='DELETE_POST'){
    postList=postList.filter((item)=>item.id!==action.postId)
  }else if(action.type==='INITIAL_POST'){
    postList=action.posts
  }
  return postList;
}

function PostProvider({children}){
  const [loading, setLoading] = useState(false);
  const DefaultPost=[
    {
      id:1,
      title:'Go to Delhi',
      description:'Today i m Happy to share today i m going to delhi to explore delhi',
      reactions:15,
      userId:'user-12',
      tags:["travel","enjoy","delhivibes"]
    },
    {
      id:2,
      title:'Go to Attend Exam',
      description:'Today i attend to exam of Data AnalyTics exam.',
      reactions:30,
      userId:'user-05',
      tags:["travel","enjoy","delhivibes"]
    }
  ]
  const[postList,dispatchPost]=useReducer(PostReducer,[]);
  const handleAdd=(post)=>{
    dispatchPost({type:"NEW_POST",post})
  }

  const handleInitialPost=(posts)=>{
    dispatchPost({type:"INITIAL_POST",posts})
  }

  const handleDelete=(postId)=>{
    dispatchPost({type:"DELETE_POST",postId})
  }

  useEffect(() => {
    const controller=new AbortController();
    const signal=controller.signal;
    setLoading(true)
    fetch('https://dummyjson.com/posts',{signal})
      .then(res => res.json())
      .then(data => {
        handleInitialPost(data.posts);
        setLoading(false);
      }
      );

      return()=>{
        controller.abort();
      }
  }, [])

  return(
    <PostContex.Provider value={{postList,loading,handleAdd,handleDelete}}>
      {children}
    </PostContex.Provider>
  )
}

export default PostProvider;