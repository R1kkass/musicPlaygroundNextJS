import Link from "next/link"
import { FC, useState } from "react"
import { CSSTransition } from "react-transition-group"

const LeftMenu: FC = () => {
    const [status, setStatus] = useState<boolean>(false)

    return (
        <>
            <svg
                onClick={() => setStatus(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                id="Layer_1"
                viewBox="0 0 16 16"
                width="30px"
                height="30px"
            >
                <rect className="cls-1" x="11" y="3" width="2" height="10" />
                <rect className="cls-1" x="7" y="3" width="2" height="10" />
                <rect className="cls-1" x="3" y="3" width="2" height="10" />
            </svg>

            <CSSTransition
                in={status}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div
                    className="LeftMenu__back"
                    onClick={() => setStatus(false)}
                >
                    <div
                        className="LeftMenu"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg
                            onClick={() => setStatus(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            id="Layer_1"
                            viewBox="0 0 16 16"
                            width="30px"
                            height="30px"
                            style={{ transform: "rotate(90deg)" }}
                        >
                            <rect
                                className="cls-1"
                                x="11"
                                y="3"
                                width="2"
                                height="10"
                            />
                            <rect
                                className="cls-1"
                                x="7"
                                y="3"
                                width="2"
                                height="10"
                            />
                            <rect
                                className="cls-1"
                                x="3"
                                y="3"
                                width="2"
                                height="10"
                            />
                        </svg>
                        <div>
                            <Link href="/">??????????????</Link>
                        </div>
                        <div>
                            <Link href="/login">????????</Link>
                        </div>
                        <div>
                            <Link href="/registration">??????????????????????</Link>
                        </div>
                        <div>
                            <Link href="/allmusic">????????????</Link>
                        </div>
                        <div>
                            <Link href="/musicadd">???????????????? ????????????</Link>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}

export default LeftMenu
