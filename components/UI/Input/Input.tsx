import { forwardRef, ReactNode, FC } from "react"

type Props = {
    children?: ReactNode;
} & HTMLInputElement

export type Ref = HTMLInputElement;

const Input = forwardRef<HTMLInputElement>((props:any, ref) => (
    <input ref={ref} className="Input__main" {...props}/>
))

export default Input