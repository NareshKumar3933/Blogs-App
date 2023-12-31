import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const CreateBlog = () => {

  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const blog = {
      title,
      description
    };
    const response = await fetch("http://localhost:5000/post-blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog),
    });
    if (response.status === 200) {
      toast.success(
        "Blog posted successfully"
      );
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Something went wrong");
    }
  };


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />


      <div className="w-[90vw] lg:w-[60vw] mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center">Create Blog</h1>
        <form className="flex flex-col gap-3" onSubmit={postData}>
          <label htmlFor="title" className="font-semibold text-lg">
            Title :
          </label>
          <input type="text"
            name="title"
            id=""
            placeholder="Enter the blog title"
            className="px-3 py-2 rounded-md outline-none border-2 border-grey-400" />
          <label htmlFor="title" className="font-semibold text-lg">
            Description :
          </label>
          <textarea className="rounded-md outline-none border-2 border-grey-400 p-3" rows={10}
            name="description" />
          <button type="submit" className="bg-purple-300 hover:bg-purple-500 py-3 rounded-md text-white text-xl font-bold">Post</button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog