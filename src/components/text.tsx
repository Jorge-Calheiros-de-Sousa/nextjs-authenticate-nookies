import { HTMLAttributes } from "react";

type Props = HTMLAttributes<any> & {
    children: any
}

export default function Text({ children, ...rest }: Props) {
    return (
        <p {...rest}>
            {children}
        </p>
    )
}