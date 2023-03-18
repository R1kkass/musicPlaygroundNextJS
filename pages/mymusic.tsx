import { getAll, getAllUser } from "API/getAll"
import PlayList from "components/Features/PlayList/PlayList"
import jwtDecode from "jwt-decode"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import React from "react"

interface TData {
    music: any
    count: number
}

const MyMusic: FC<any> = observer(() => {
    useEffect(() => {
        if (switchMiusic?.musicArray?.length==0) {
            setLimit((p) => p + 10)
            getAllUser(
                10,
                jwtDecode(localStorage?.getItem("token") || "") || 0
            ).then((e) => {
                setCountMusic(e?.music?.count)
                console.log(e.rows)
                switchMiusic.musicArrAdd(e?.rows)
            })
        }
    }, [])

    const { ref, inView, entry } = useInView({ threshold: 0 })

    useEffect(() => {
        if (inView && countMusic > limit && switchMiusic?.musicArray?.length>0) {
            setLimit((p) => p + 10)
            getAllUser(
                limit,
                jwtDecode(localStorage?.getItem("token") || "") || 0
            ).then((e) => {
                setCountMusic(e?.music?.count)
                console.log(e?.music?.rows.Music)
                switchMiusic.musicArrAdd(e?.rows)
            })

        }
    }, [inView])

    const [limit, setLimit] = React.useState(20)
    const [countMusic, setCountMusic] = React.useState<number>(Infinity)

    return (
        <>
            <PlayList />
            <div ref={ref}></div>
        </>
    )
})

export default MyMusic
