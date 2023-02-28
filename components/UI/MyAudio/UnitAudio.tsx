import { observer } from "mobx-react-lite"
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import switchMusic from "../../../MobX/store/switchMiusic"

let int: ReturnType<typeof setInterval>

const UnitAudio: FC<{ music: string; name: string; id: number }> = observer(
    ({ music, name, id }) => {
        const [time, setTime] = useState<number>(0)
        const refAudio: any = useRef(
            typeof Audio !== "undefined" && new Audio(music)
        )
        useLayoutEffect(() => {
            refAudio.current.onloadedmetadata = () => {
                setTime(refAudio.current.duration)
            }
        }, [])

        function duration() {
            switchMusic.timeSet(0)
            clearInterval(switchMusic.int)
            switchMusic.music.currentTime = switchMusic.time

            int = setInterval(() => {
                switchMusic.timeSet()
                if (switchMusic.time >= switchMusic.music.duration) {
                    clearInterval(switchMusic.int)
                    switchMusic.timeSet(0)
                }
            }, 1000)
            switchMusic.intSet(int)
        }

        function pause() {
            clearInterval(switchMusic.int)
            switchMusic.music.pause()
            switchMusic.timeSet(0)
            duration()
            if (switchMusic.status) {
                switchMusic.statusSw(!switchMusic.status)
                switchMusic.music.play()
            } else {
                clearInterval(switchMusic.int)
                switchMusic.statusSw(!switchMusic.status)
                switchMusic.music.pause()
            }
        }

        if (id == switchMusic.id && !switchMusic.status) {
            return (
                <div
                    className="UnitMusic__main"
                    onClick={() => {
                        switchMusic.statusSw(false)
                        switchMusic.music.pause()
                        switchMusic.switch(refAudio, name, id)
                        pause()
                    }}
                >
                    <div className="Main__div">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z"
                                fill="#fff"
                            />
                        </svg>
                        <p>{name}</p>
                    </div>
                    <div>
                        <p>
                            {Math.floor(time / 60)} :{" "}
                            {Math.floor(time % 60) < 10
                                ? "0" + Math.floor(time % 60)
                                : Math.floor(time % 60)}
                        </p>
                    </div>
                </div>
            )
        }

        return (
            <div
                className="UnitMusic__main"
                onClick={() => {
                    switchMusic.statusSw(true)
                    switchMusic.music.pause()
                    switchMusic.switch(refAudio, name, id)
                    pause()
                }}
            >
                <div className="Main__div">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"
                            fill="#fff"
                        />
                    </svg>
                    <p>{name}</p>
                </div>
                <div>
                    <p>
                        {Math.floor(time / 60)} :{" "}
                        {Math.floor(time % 60) < 10
                            ? "0" + Math.floor(time % 60)
                            : Math.floor(time % 60)}
                    </p>
                </div>
            </div>
        )
    }
)

export default UnitAudio
