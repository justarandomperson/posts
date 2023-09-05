export default function EditPostPage(props) {
    return (
        <main className="h-screen w-screen mt-10">
        <div className="mx-auto w-1/2 h-4/5 border border-white">
            <input className="w-full h-[10%] bg-transparent text-center p-2 text-2xl" placeholder="title" value = {
                props.post.title || ""} onChange={(e) => props.setPost({ ...props.post, title: e.target.value })}></input>
            <hr/>
            <textarea className="h-[90%] w-full bg-transparent resize-none border-none outline-none text-xl p-2" placeholder="content" 
            value = {props.post.content || ""}  onChange={(e) => props.setPost({ ...props.post, content: e.target.value })}/>
            <button className="float-right border border-white p-2 mt-0 w-20 hover:bg-gray-500" onClick={props.submit} >{props.btnText}</button>
        </div>
        </main>
    )
}