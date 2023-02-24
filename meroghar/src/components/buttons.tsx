
import { SocialLoginProps } from "../interface/buttons"

export function SocialLogin({ placeholder, url, img }: SocialLoginProps): JSX.Element {
    return (
      <a
        href={url}
        className="text-md group my-1 flex w-[95%]  items-center  rounded-md border-2  border-gray-500 p-2 hover:bg-mainColor"
      >
        <img src={img} alt="google" className="h-5 w-5 rounded" />
        <span className=" w-[90%] text-center text-gray-600 group-hover:text-white">
          {placeholder}
        </span>
      </a>
    )
  }


