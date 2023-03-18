import { observer } from "mobx-react-lite"
import {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    useEffect,
    useRef,
    useState,
} from "react"
import ReactAudioPlayer from "react-audio-player"
import ButtonPause from "./ButtonPause"
import switchMiusic from "MobX/store/switchMiusic"

let int: any

export interface IData {
        id: number
        name: string
        hashName: string
        author: string
        album: string
        genreId: string
        Music?:{
            id: number
            name: string
            hashName: string
            author: string
            album: string
            genreId: string
        }
}

const MyAudio: FC = observer(() => {
    const durationRef = useRef<any>(null)
    const volumeRef = useRef<HTMLInputElement>(null)

    function duration(e?: any) {
        clearInterval(switchMiusic.int)
        if (e?.value) {
            switchMiusic.music.currentTime = e?.value
            switchMiusic.timeSet(e?.value)
        }
        if (!switchMiusic.status) {
            int = setInterval(() => {
                switchMiusic.timeSet()
                if (switchMiusic.time >= switchMiusic?.music?.duration) {
                    clearInterval(switchMiusic.int)
                    switchMiusic.timeSet(0)
                }
            }, 1000)
            switchMiusic.intSet(int)
        }
    }

    function pause() {
        if (switchMiusic.status) {
            switchMiusic.statusSw(!switchMiusic.status)
            duration()
            switchMiusic.music.volume = Number(volumeRef.current?.value) / 100
            switchMiusic.music.play()
        } else {
            clearInterval(switchMiusic.int)
            switchMiusic.statusSw(!switchMiusic.status)
            switchMiusic.music.pause()
        }
    }

    if (!switchMiusic.name) {
        return <></>
    }

    function switchMusic(id: number) {
        let ids = id
        let a: any = switchMiusic.musicArray[id]
        
        if (!a) {
            a = switchMiusic.musicArray[0]
            ids=0
        }
        console.log(switchMiusic.musicArray[ids ? ids - 1 : 0]?.hashName);
        let link =
            typeof Audio !== "undefined" &&
            new Audio(`http://localhost:5001/${a?.hashName}`)
        switchMiusic.music.pause()
        switchMiusic.switch(link, a?.name, ids)
        console.log(a.hashName);
        
        switchMiusic.statusSw(true)
        switchMiusic.timeSet(0)
        pause()
    }

    return (
        <div className="MyAudio">
            <input
                style={{
                    backgroundSize: `${
                        (switchMiusic.time / switchMiusic.music.duration) * 100
                    }% 100%`,
                }}
                ref={durationRef}
                value={switchMiusic.time}
                defaultValue={0}
                className="MyAudio__duration"
                min="0"
                type="range"
                max={String(switchMiusic?.music?.duration)}
                onChange={(e: any) => {
                    duration(e.target)
                }}
            />
            <div className="MyAudio">
                <div className="MyAudio__left">
                    <div>
                        <svg
                            onClick={() => switchMusic(switchMiusic.id - 1)}
                            fill="#fff"
                            height="25px"
                            width="25px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 66.31 66.31"
                            stroke="#000000"
                            stroke-width="0.0006630700000000001"
                            transform="rotate(180)"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                    {" "}
                                    <path d="M64.702,30.366L37.12,14.442c-0.995-0.574-2.221-0.574-3.217,0s-1.609,1.639-1.609,2.787v13.072L4.827,14.442 c-0.997-0.574-2.222-0.574-3.218,0S0,16.081,0,17.229v31.849c0,1.148,0.613,2.211,1.609,2.785c0.498,0.287,1.053,0.432,1.608,0.432 s1.111-0.145,1.609-0.432l27.466-15.857v13.072c0,1.148,0.612,2.211,1.608,2.785c0.498,0.287,1.055,0.432,1.609,0.432 s1.111-0.145,1.607-0.432l27.582-15.924c0.996-0.574,1.609-1.637,1.609-2.787C66.311,32.004,65.698,30.94,64.702,30.366z" />{" "}
                                </g>{" "}
                            </g>
                        </svg>
                        <ButtonPause
                            status={switchMiusic.status}
                            callback={() => pause()}
                        />
                        <svg
                            onClick={() => switchMusic(switchMiusic.id + 1)}
                            height="25px"
                            width="25px"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            viewBox="0 0 66.307 66.307"
                        >
                            <g>
                                <path d="M64.702,30.366L37.12,14.442c-0.995-0.574-2.221-0.574-3.217,0s-1.609,1.639-1.609,2.787v13.072L4.827,14.442	c-0.997-0.574-2.222-0.574-3.218,0S0,16.081,0,17.229v31.849c0,1.148,0.613,2.211,1.609,2.785c0.498,0.287,1.053,0.432,1.608,0.432 s1.111-0.145,1.609-0.432l27.466-15.857v13.072c0,1.148,0.612,2.211,1.608,2.785c0.498,0.287,1.055,0.432,1.609,0.432 s1.111-0.145,1.607-0.432l27.582-15.924c0.996-0.574,1.609-1.637,1.609-2.787C66.311,32.004,65.698,30.94,64.702,30.366z" />
                            </g>
                        </svg>
                    </div>
                    <div>
                        <p>{switchMiusic?.name} - {switchMiusic?.musicArray[switchMiusic?.id-1]?.author}</p>
                    </div>
                </div>
                <div className="MyAudio__right">
                    <p>
                        {Math.floor(switchMiusic?.time / 60)} :{" "}
                        {Math.floor(switchMiusic?.time % 60) < 10
                            ? "0" + Math.floor(switchMiusic?.time % 60)
                            : Math.floor(switchMiusic?.time % 60)}
                    </p>
                    <input
                        ref={volumeRef}
                        className="MyAudio__volume"
                        min="0"
                        defaultValue={100}
                        max="100"
                        type="range"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            switchMiusic.volumeSet(e.target?.value)
                            switchMiusic.music.volume = Number(e.target?.value) / 100
                        }}
                    />
                </div>
            </div>
        </div>
    )
})

export default MyAudio
