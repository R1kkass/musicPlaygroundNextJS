import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import Link from "next/link"
import { FC, useState } from "react"
import LeftMenu from "./UI/LeftMenu"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="Content">
                <div className="Layout">
                    <LeftMenu></LeftMenu>
                    <Link href="/">Главная</Link>
                    <Link href="/login">Вход</Link>
                    <Link href="/registration">Авторизация</Link>
                    <Link href="/allmusic">Музыка</Link>
                    <div className="PlayList__Search">
                        <Input placeholder="Поиск..." />
                        <StyledButton color="white">Искать</StyledButton>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}

export default Layout
