import { useState, useEffect } from "react"
import { AiFillDelete } from "react-icons/ai"
import { MdOutlineModeEditOutline } from "react-icons/md"
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost,setEditPost] = useState(false);
  const [selectedPostId, setSelectPostId] = useState("");
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, [posts])
  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs")
    const data = await response.json();
    setPosts(data.blogs);
  };

  const deletePost = async (id) => {
    const response = await fetch("http://localhost:5000/delete-blog/" + id, {
      method: "DELETE",
    });
    if (response.status === 200) {

      toast.success("Blog deleted successfully")
    }
    else{
      toast.error("Something went wrong")
    }
  };

  const updatePost = async (id) =>{
    console.log(title,description,id);
    const response = await fetch(`http://localhost:5000/update-blog/${id}`,{
     method:"PUT",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({title,description}), 
       });
       if (response.status === 200) {

        toast.success("Blog updated successfully")
      }
      else{
        toast.error("Something went wrong")
      }

  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="my-10 flex flex-col gap-5">
        {
          posts.map(post => {
            return (<div className="w-[40vw] mx-auto p-3 rounded-md shadow-md" key={post._id}>
              <div className="flex justify-end text-lg gap-3">
                <AiFillDelete className="text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transtion-all"
                  onClick={() => deletePost(post._id)} />
                <MdOutlineModeEditOutline className={`${ selectedPostId=== post._id && editPost? "text-red-400 scale-110" : "text-gray-400" } text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transtion-all`} onClick={
                  ()=>{setEditPost(!editPost);
                    setSelectPostId(post._id);
                }}/>
              </div>
              <h2 onInput={(e) => setTitle(e.target.innerText)} 
              className="text-lg font-bold my-2 outline-none focus:bg-gray-200" contentEditable={editPost}> {post.title} </h2>
              
              <h3 onInput={(e) => setDescription(e.target.innerText)}
              className="text-gray-400 font-semibold outline-none focus:bg-gray-200" contentEditable={editPost}>{post.description}</h3>
              <button className={`${selectedPostId===post._id && editPost?"block":"hidden"} bg-purple-300 hover:bg-purple-600 px-3 py-1 my-1  rounded-md font-bold text-white`}
              onClick={() => updatePost(post._id)}>Save</button>
            </div>
            )
          })
        }

      </div>
    </>)

}

export default Home