import { getAll } from "API/getAll"
import PlayList from "components/Features/PlayList/PlayList"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import React from "react"
import AlbumSlider from "components/Features/AlbumSlider/AlbumSlider"

interface TData {
  music: any
  count: number
}

const AllMusic: FC<any> = observer(({ data }) => {
    useEffect(() => {
        switchMiusic.musicArrAdd(data)
    }, [])
    const { ref, inView, entry } = useInView({ threshold: 0 })

    useEffect(() => {
        if (inView && countMusic+10 > limit) {
            getAll(limit).then((e: TData) => {
                setLimit((p) => p + 10)
                setCountMusic(e?.music.count)
                console.log(e?.music.count)
                switchMiusic.musicArrAdd(e?.music?.rows)
            })
            
        }
        console.log(limit);

    }, [inView])

    const [limit, setLimit] = React.useState(20)
    const [countMusic, setCountMusic] = React.useState<number>(Infinity)

    return (
        <>
            <AlbumSlider/>
            <PlayList />
            <div ref={ref}></div>
        </>
    )
})

export async function getServerSideProps(context: any) {
    const data = await getAll(10)

    return { props: { data: data?.music.rows || [] } }
}

export default AllMusic
