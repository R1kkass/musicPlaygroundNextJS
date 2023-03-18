import { getAlbum, IAlbum, IRes } from "API/getAlbum"
import axios from "axios"
import { serverApiURL, staticURL } from "const/ServerApi"
import { observer } from "mobx-react-lite"
import modal from "MobX/store/modal"
import switchMiusic from "MobX/store/switchMiusic"
import { useEffect, useRef, useState } from "react"
import AlbumModal from "../AlbumModal/AlbumModal"

const AlbumSlider = observer(() => {
    const [album, setAlbum] = useState<IAlbum[]>([])
    const [postion, setPosition] = useState<number>(0)
    const next = () => {
        let slider =refSlider.current?.offsetWidth || 1
        let container = refContainer.current?.offsetWidth || 1
        let res = slider / container
        if(res>=1 && (postion-100)*-1/100<res){
            setPosition((p) => p - 100)
        }
    }
    const prev = () => {
        let slider =refSlider.current?.offsetWidth || 1
        let container = refContainer.current?.offsetWidth || 1
        
        if (postion != 0) {
            setPosition((p) => p + 100)
        }
    }
    const refSlider = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)


    useEffect(() => {
        getAlbum().then((e: any) => {
            setAlbum(e)
        })
    }, [])

    return (
        <>
            <AlbumModal />
            <div ref={refContainer} className="AlbumSlider">
                <button onClick={prev} className="AlbumSlider__buttonPrev">
                    <div></div>
                </button>
                <div
                    ref={refSlider}
                    style={{ marginLeft: postion + "%" }}
                    className="AlbumSlider__container"
                >
                    {album?.map((alb) => (
                        <div
                            className="AlbumSlider__album"
                            onClick={() => {modal.stateSet(true, alb.id);}}
                        >
                            <div>
                                <img src={staticURL+'/img/'+alb.img}></img>
                            </div>
                            <p className="AlbumSlider__name">
                                {alb?.name}
                            </p>
                            <p className="AlbumSlider__author">
                                
                            </p>
                        </div>
                    ))}
                </div>
                <button onClick={next} className="AlbumSlider__buttonNext">
                    <div></div>
                </button>
            </div>
        </>
    )
})

export default AlbumSlider
