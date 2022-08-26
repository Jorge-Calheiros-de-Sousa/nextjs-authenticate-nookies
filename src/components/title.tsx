import { HTMLAttributes } from "react";

type Props = HTMLAttributes<any> & {
    children: any
}

export default function Title({ children, ...rest }: Props) {
    return (
        <h1 {...rest}>
            {children}
        </h1>
    )
}