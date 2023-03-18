import axios from "axios"
import { serverApiURL } from "const/ServerApi"
import React from 'react'
import jwtDecode from 'jwt-decode'

async function addUserMusic(id:number){
    let token:{id: number} =  jwtDecode(localStorage?.getItem('token') || '')
    await axios.post(`${serverApiURL}/music/addmusicuser`,{
        musicId: id,
        userId: token.id,
    })
}

const PlusSvg:React.FC<{idMusic: number}> = ({idMusic})=>{
    return(
        <svg onClick={(e)=>{e.stopPropagation();
         addUserMusic(idMusic)}} xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L12 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export default PlusSvg