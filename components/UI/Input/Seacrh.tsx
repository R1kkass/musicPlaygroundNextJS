import axios from "axios"
import switchMiusic from "MobX/store/switchMiusic"
import { forwardRef, useRef } from "react"
import { IData } from "../MyAudio/MyAudio"
import { redirect } from 'next/navigation';

interface IRes {
    data: {
        music: IData[]
    }
}

const Search = forwardRef<HTMLInputElement, any>((props, ref) => {
    async function searchMusic() {
        const res: IRes = await axios.get(
            `http://localhost:5001/api/music/getall?name=${nameRef?.current?.value}`
        )
        console.log(res?.data.music)

        switchMiusic.musicArrAdd(res?.data.music)
    }
    const nameRef = useRef<HTMLInputElement>(null)

    return (
        <div className="Search__container">
            <input ref={nameRef} className="Search" {...props}></input>
            <svg
                onClick={searchMusic}
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    opacity="0.1"
                    d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    fill="gray"
                />
                <path
                    d="M17 17L21 21"
                    stroke="gray"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="gray"
                    stroke-width="2"
                />
            </svg>
        </div>
    )
})

export default Search
