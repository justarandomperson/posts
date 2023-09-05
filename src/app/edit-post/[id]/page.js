"use client"
import EditPostPage from "@/app/components/EditPost";
import { useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/app/components/LoadingCircle";

export default function editPostPage({params}) {
    const router = useRouter()
    const [post, setPost] = useState({})
    const [Loading, setLoading] = useState(true)
    const prodId = params.id

    const updatePost = async () => {
        try {
            router.push("/")
            const res = await axios.put('/api/posts', post)
            if (!res.data.success) {
                throw new Error()
            }
        } catch(err) {
            toast.error("Sorry, something went wrong.")
            router.back();
        }

    }

    useEffect(() => {
        const getPageData = async() => {
            try {
                const isAuthres = await axios.get("/api/users/user")
                if (!isAuthres.data.user) {return router.push('/')} 
                const response = await axios("/api/posts/"+prodId)
                const foundPost = response.data.post
                if (foundPost.creator !== isAuthres.data.user.username) {return router.push('/')}
                setPost({id: prodId,title: foundPost.title, content: foundPost.content, lastEdit: new Date().toLocaleDateString(), creator: foundPost.creator})
                setLoading(false)
            } catch(err) {
                toast.error("Something went wrong.")
            }
        }
        getPageData()
    }, [])


    return (
       <div>
         {Loading ? (
            <LoadingCircle height="h-20"/>
        ): (
            <EditPostPage submit={updatePost} post={post} setPost = {setPost} btnText={"UPDATE"}/>
        )}
       </div>
    )
}