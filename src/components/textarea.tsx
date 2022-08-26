import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<any> & {
    label: string
    requiredInput?: boolean
}

export default function TextArea({ label, requiredInput = true, ...rest }: Props) {
    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {label} {requiredInput ? <span> * </span> : <span></span>}
                </label>
            </div>
            <div className="md:w-2/3">
                <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" {...rest}>
                </textarea>
            </div>
        </div>
    )
}