import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import Search from "components/UI/Input/Seacrh"
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
                <div className="ContainerLayout">
                    <div className="Layout">
                        <LeftMenu></LeftMenu>
                        {/* <Link href="/">Главная</Link>
                        <Link href="/login">Вход</Link>
                        <Link href="/registration">Авторизация</Link>
                        <Link href="/allmusic">Музыка</Link> */}
                        <div className="PlayList__Search">
                            <Search placeholder="Поиск..." />
                        </div>
                    </div>
                </div>
                {children}
            </div>
            <div className="Footer">
                
            </div>
        </>
    )
}

export default Layout
