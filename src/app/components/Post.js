export default function Post(props) {
    return (
        <div className="w-40 max-h-32 border border-white ml-5">
            <h2 className="p-1">By: {props.creator}</h2>
            <h1 className="text-center p-1">{props.title}</h1>
            <hr/>
            <h3 className="p-2">{props.content}</h3>
        </div>
    )
}