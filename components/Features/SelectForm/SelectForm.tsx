import { useQuery } from "@apollo/client"
import { GENRE_ALL } from "graphql/query/genre"

interface IGenre {
    getAllGenre: TGenre[]
}

type TGenre = {
    id: number
    genre: string
}

const SelectForm = () => {
    const { data, error, loading } = useQuery<IGenre>(GENRE_ALL)

    return (
        <select>
            {data?.getAllGenre?.map((genre: TGenre) => (
                <option key={genre?.id}>{genre?.genre}</option>
            ))}
        </select>
    )
}

export default SelectForm
