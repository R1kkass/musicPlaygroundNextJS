import PlayList from "components/Features/PlayList/PlayList"
import { IData } from "components/UI/MyAudio/MyAudio"
import UnitAudio from "components/UI/MyAudio/UnitAudio"
import { serverApiURL, staticURL } from "const/ServerApi"
import { observer } from "mobx-react-lite"
import modal from "MobX/store/modal"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"

interface IPost {
    album: any
    music: IData[]
}

const albums: FC<IPost> = observer(({ album = [], music = [] }) => {
    useEffect(() => {
        switchMiusic.musicArrAdd(music)
        console.log(album);
        
      }, [])
    return (
        <div className="Album">
            <div className="AlbumModal__img">
                    <img src={"http://localhost:5001/img/"+album?.img} />
                    <p className="AlbumSlider__name">
                        {album?.name}
                    </p>
                    <p className="AlbumSlider__author">
                        {album?.author}
                    </p>
                </div>
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
