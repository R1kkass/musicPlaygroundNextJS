import PlayList from "components/Features/PlayList/PlayList"
import { observer } from "mobx-react-lite"
import switchMiusic from "MobX/store/switchMiusic"
import { FC, useEffect } from "react"

const AllMusic: FC<any> = observer(({ data }) => {
  useEffect(() => {
    switchMiusic.musicArrAdd(data)
  }, [])

  return <PlayList data={switchMiusic.musicArray} />
})

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:5001/api/music/getall`)
  const data = await res.json()

  return { props: { data: data?.music || [] } }
}

export default AllMusic
