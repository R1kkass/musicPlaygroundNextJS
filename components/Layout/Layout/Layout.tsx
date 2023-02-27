import Link from "next/link"
import { FC } from "react"

interface LayoutProps{
    children: React.ReactNode
}

const Layout:FC<LayoutProps> = ({children}) =>{
    return (
        <>
        <div className="Content">
            <div className="Layout">
                <Link href="/">Главная</Link>
                <Link href="/login">Вход</Link>
                <Link href="/registration">Авторизация</Link>
                <Link href="/allmusic">Музыка</Link>
                
            </div>
            {children}
        </div>
        </>
    )
}

export default Layout