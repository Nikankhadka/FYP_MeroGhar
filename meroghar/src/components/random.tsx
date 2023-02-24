
interface Etext{
    text:string
}

export function ErrorText({text}:Etext){
    return(
        <span className="block w-[95%] text-left text-sm text-red-700">
        {text}
      </span>
    )
}