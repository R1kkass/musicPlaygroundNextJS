import axios from "axios"
import StyledButton from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import MyAudio from "components/UI/MyAudio/MyAudio"
import UnitAudio from "components/UI/MyAudio/UnitAudio"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"

interface IPlayList {
    data: TList[]
}

type TList = {
    id: number
    hashName: string
    name: string
    author: string
}

const PlayList: FC<IPlayList> = observer(({ data = [] }) => {
    return (
        <div className="PlayList">
            <div className="PlayList__Search">
                <Input placeholder="Поиск..." />
                <StyledButton color="white">Искать</StyledButton>
            </div>
            <div className="UnitMusic">
                {data?.map((music) => (
                    <div className="UnitMusic__div" key={music?.id}>
                        <UnitAudio
                            id={music?.id}
                            music={`http://localhost:5001/${music?.hashName}`}
                            name={music?.name}
                        />
                        {music?.name}
                    </div>
                ))}
            </div>
        </div>
    )
})

export default PlayList
