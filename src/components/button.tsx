import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<any> & {
    children: any
}

export default function Button({ children, ...rest }: Props) {
    return (
        <button {...rest}>
            {children}
        </button>
    )
}