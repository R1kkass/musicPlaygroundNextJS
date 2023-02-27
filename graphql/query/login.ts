import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
    mutation getOneUser($input: UserInput) {
        getOneUser(input: $input) {
            token
            id
            message
        }
    }
`

export const QUERY_MUSIC = gql`
    query getAllMusic($input: MusicInput) {
        getAllMusic(input: $input) {
            id
            name
            author
            hashName
        }
    }
`
