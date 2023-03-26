
interface AlertProps{
    type:string,
    message:string
}


export default function AlertC({type,message}:AlertProps) {
  return (
    <main className="fixed z-10 top-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-fit transition-all">

{  type=="info"&&<div
        className="mb-4 rounded-lg text-center bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
       
      >
        <span className="font-medium">Info alert!</span>{message}
      </div>
      }

{ type=='danger' && <div
        className="mb-4 text-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
        
      >
        <span className="font-medium">Danger alert!</span> {message}
      </div>}

{  type=='success'  && <div
        className="mb-4 text-center rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
        
      >
        <span className="font-medium">Success alert!</span>{message}
      </div>}

{type=='warning'&&<div
        className="mb-4 text-center rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
        
      >
        <span className="font-medium">Warning alert!</span>{message}
      </div>}

    </main>
  )
}
