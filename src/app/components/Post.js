import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Post(props) {

    const deletePost = async () => {
       try {
        props.setPosts(props.posts.filter((post) => post._id!==props.post._id))
        const response = await axios.delete("/api/posts/"+props.post._id)
        if (!response.data.success) {
            throw new Error()
        }
       } catch {
        props.setPosts(props.posts)
        toast.error("There was an issue with deleting the post.\nPlease try again.")
       }
    }

    return (
        <div className="max-w-40 min-w-[5%] ml-5 mt-5">
            <div className="max-h-32 border border-white">
                <h2 className="p-1">By: {props.post.creator}</h2>
                <h1 className="text-center p-1">{props.post.title}</h1>
                <hr/>
                <h3 className="p-2">{props.post.content}</h3>
            </div>
            {props.user == props.post.creator ? (
                <div>
                    <button className="float-right w-16 text-center p-2 border-t-0 border border-white" onClick={deletePost}>Delete</button>
                    <Link href={"/edit-post/"+props.post._id} className="float-right w-16 text-center p-2 border-t-0 border border-white">Edit</Link>
                </div>
            ): (
                ""
            )}
        </div>
    )
}