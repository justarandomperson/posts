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
    const title = props.post.title.length>20 ? props.post.title.slice(0,20) + "..." : props.post.title
    const content = props.post.content.length > 50 ? props.post.content.slice(0,50) + "..." : props.post.content

    return (
        <div className="w-[15em] max-h-40 ml-5 mt-5">
            <div className="max-h-full border border-white">
                <h2 className="p-1">By: {props.post.creator}</h2>
                <h1 className="text-center p-1 break-words">{title}</h1>
                <hr/>
                <h3 className="p-2 break-words">{content}</h3>
            </div>
            <Link href={"/"+props.post._id} className="float-right text-center p-2 border-t-0 border border-white">View post</Link>
            {props.user.username == props.post.creator || props.user.isAdmin ? (
                <div>
                    <button className="float-right text-center p-2 border-t-0 border border-white" onClick={deletePost}>Delete</button>
                    <Link href={"/edit-post/"+props.post._id} className="float-right text-center p-2 border-t-0 border border-white">Edit</Link>
                </div>
            ): (
                ""
            )}
        </div>
    )
}