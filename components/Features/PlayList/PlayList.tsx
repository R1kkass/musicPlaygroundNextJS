import UnitAudio from "components/UI/MyAudio/UnitAudio"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"
import React from "react"


const PlayList: FC = observer(() => {
console.log(switchMiusic?.musicArray[0]?.Music);


    if(switchMiusic?.musicArray[0]?.Music){
        return (
            <div className="PlayList">
                <div className="UnitMusic">
                    {switchMiusic?.musicArray?.map((music, iter) => (
                        <div className="UnitMusic__div" key={music?.Music?.id}>
                            <UnitAudio
                                id={iter}
                                music={`http://localhost:5001/${music?.Music?.hashName}`}
                                name={music?.Music?.name || music?.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="PlayList">
            <div className="UnitMusic">
                {switchMiusic?.musicArray?.map((music, iter) => (
                    <div className="UnitMusic__div" key={music?.id}>
                        <UnitAudio
                            id={iter}
                            music={`http://localhost:5001/${music?.hashName}`}
                            name={music?.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
})

export default PlayList
