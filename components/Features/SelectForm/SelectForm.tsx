import { useQuery } from "@apollo/client"
import { GENRE_ALL } from "graphql/query/genre"
import { FC, forwardRef } from "react"

interface IGenre {
    getAllGenre: TGenre[]
}

type TGenre = {
    id: number
    genre: string
}

const SelectForm = forwardRef<HTMLSelectElement>((props, ref) => {
    const { data, error, loading } = useQuery<IGenre>(GENRE_ALL)

    return (
        <select ref={ref}>
            {data?.getAllGenre?.map((genre: TGenre) => (
                <option key={genre?.id}>{genre?.genre}</option>
            ))}
        </select>
    )
})

export default SelectForm
