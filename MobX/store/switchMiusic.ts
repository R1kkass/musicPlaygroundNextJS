import { makeAutoObservable } from "mobx"
import { IData } from "components/UI/MyAudio/MyAudio"

class SwitchMusic {
    music: any = typeof Audio !== "undefined" && new Audio()
    name = ""
    musicArray: Array<IData> = []
    volume = "1"
    status = true
    time = 0
    int: any = null
    id = 0

    constructor() {
        makeAutoObservable(this)
    }

    switch(mus?: any, name?: string, id?: number) {
        if (mus.current) {
            this.music = mus.current
            this.id = id || 0
            this.name = name || ""
        } else if (mus) {
            this.music = mus
            this.name = name || ""
            this.id = id || 0
        } else {
            if (this.musicArray[id || 0]) {
                this.music = new Audio(
                    `http://localhost:5001/${
                        this.musicArray[id || 0]?.hashName
                    }`
                )
            } else {
                this.music = new Audio(
                    `http://localhost:5001/${this.musicArray[0]?.hashName}`
                )
            }
            this.name = this.musicArray[id || 0]?.name
            this.id = id || 0
            this.music.play()
        }
    }

    switchInerval(){
        let a: any = this.musicArray[this.id]
        
        if (!a?.hashName) {
            a = this.musicArray[0]
        }
        let link =
            typeof Audio !== "undefined" &&
            new Audio(`http://localhost:5001/${a?.hashName}`)
        this.music.pause()
        this.switch(link, a?.name, a?.id)
        this.status=false
        this.time=0
        this.music.volume=this.volume
        this.music.play()
    }

    musicArrAdd(arr: any) {
        this.musicArray = arr
    }

    statusSw(bol: boolean) {
        this.status = bol
    }

    timeSet(arg?: number) {
        if (arg != undefined) {
            this.time = arg
        } else {
            this.time = Number(this.time) + 1
        }
        if (this.time >= this.music.duration) {
            this.time = 0
            this.status = false
            this.switchInerval()
        }
    }

    intSet(ints: any) {
        this.int = ints
    }

    volumeSet(volumes: string){
        this.volume=String(Number(volumes)/100)
    }

    idSet(id: number){
        this.id=0
    }
}

export default new SwitchMusic()
