import PlayList from "components/Features/PlayList/PlayList"
import { IData } from "components/UI/MyAudio/MyAudio"
import UnitAudio from "components/UI/MyAudio/UnitAudio"
import { serverApiURL, staticURL } from "const/ServerApi"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"

interface IPost {
    album: any
    music: IData[]
}

const albums: FC<IPost> = observer(({ album = [], music = [] }) => {
    useEffect(() => {
        switchMiusic.musicArrAdd(music)
      }, [])
    return (
        <div className="Album">
            {/* {switchMiusic.musicArray?.map((mus: IData) => (
                <div className="UnitMusic__div">
                    <UnitAudio
                        music={`${staticURL}/${mus.hashName}`}
                        id={mus.id}
                        name={mus.name}
                    />
                </div>
            ))} */}
            <PlayList />
        </div>
    )
})

export async function getServerSideProps(context: any) {
    console.log(context)

    const res = await fetch(
        `${serverApiURL}/album/getone?id=${context.params?.id}`
    )
    const post = await res.json()

    return { props: { music: post.music, album: post.album } }
}
export default albums
