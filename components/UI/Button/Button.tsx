import React, { FC } from "react"
import styled from "styled-components"

const StyledButton = styled.button<any>`
 min-width: 100px;
 height: 42px;
 color: ${(props: any) => props.color || "rgb(0,163,0)"};
 font-size: 20px;
 background: ${(props: any) => props.backgroundcolor || "none"};
 width: ${(props: any) => props.width || "fit-content"};
 border: none;
 outline: none;
 border-radius: 10px;
 cursor: pointer;
 padding: 5px;
 transition: 0.3s;
 outline: 1px solid rgb(0,163,0);
 &:hover{ 
    background: none; 
    color: white;
    background: rgb(0,163,0);
    outline: 1px solid rgb(0,163,0);
 `

const Button: FC<{
    children: React.ReactNode
    color: string
    backgroundcolor: string
    width: string
}> = (props) => {
    return <Button {...props}>{props.children}</Button>
}

export default StyledButton
