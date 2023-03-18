import axios from "axios"
import { serverApiURL } from "const/ServerApi"
import { makeAutoObservable } from "mobx"

interface IAlbum{
        music?:[{
            id: number
            name: string
            userId: number
            hashName: string
            album: string
            genreId: number
        }]
        album?: {
            id: number
            name: string
            img: string
            author: string
        }
}

class Modal{
    state = false
    albumObj:IAlbum = {}
    constructor() {
        makeAutoObservable(this)
    }

    async stateSet(bol:boolean, id?: number){
        this.state = bol
        let res = await axios.get(`${serverApiURL}/album/getone?id=${id}`)
        this.albumObj = res.data
        console.log(this.albumObj);
        
    }
}

export default new Modal()