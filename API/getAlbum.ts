import axios from "axios";
import { serverApiURL } from "const/ServerApi";

export interface IAlbum{
        id?: number
        name?: string
        img: string
        author: string
}

export interface IRes{
    data:{
        album?: IAlbum[]
    }
}

export async function getAlbum(){
    let t:IRes = await axios.get(`${serverApiURL}/album/getall`)
    return t.data.album
}