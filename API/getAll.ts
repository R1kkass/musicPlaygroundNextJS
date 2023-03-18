import { serverApiURL } from "const/ServerApi";

export async function getAll(limit: number, userId?: any){
    console.log('====================================');
    console.log(userId);
    console.log('====================================');
    const res = await fetch(`http://localhost:5001/api/music/getall?limit=${limit || 0}`)
    const data = await res.json()
    return data
}

export async function getAllUser(limit: number, userId?: any){
    console.log('====================================');
    console.log(userId);
    console.log('====================================');
    const res = await fetch(`${serverApiURL}/music/getmusicuser?limit=${limit || 0}&userId=${userId?.id || ''}`)
    const data = await res.json()
    return data
}