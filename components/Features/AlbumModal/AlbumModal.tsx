import UnitAudio from "components/UI/MyAudio/UnitAudio"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { FC } from "react"
import modal from "../../../MobX/store/modal"
import PlayList from "../PlayList/PlayList"

const AlbumModal: FC = observer(() => {
    return (
        <div
            className="AlbumModal"
            onClick={() => modal.stateSet(false)}
            style={modal.state ? { display: "flex" } : { display: "none" }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="AlbumModal__window"
            >
                <div className="AlbumModal__img">
                    <img src={"http://localhost:5001/img/"+modal.albumObj.album?.img} />
                    <p className="AlbumSlider__name">
                        {modal.albumObj.album?.name}
                    </p>
                    <p className="AlbumSlider__author">
                        {modal.albumObj.album?.author}
                    </p>
                    <p className="AlbumSlider__author">
                        <Link href={"album/" + modal.albumObj.album?.id}>Перейти к альбому</Link>
                    </p>
                </div>
                <div className="AlbumModal__content">
                    {modal.albumObj?.music?.map((alb) => (
                        <div className="AlbumModal__unit">
                            <UnitAudio
                                music={'http://localhost:5001/'+alb.hashName}
                                name={alb.name}
                                id={alb.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default AlbumModal
