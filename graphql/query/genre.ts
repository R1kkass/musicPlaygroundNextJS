import { gql } from "@apollo/client"

export const GENRE_ALL = gql`
    query getAllGenre {
        getAllGenre {
            id
            genre
        }
    }
`
