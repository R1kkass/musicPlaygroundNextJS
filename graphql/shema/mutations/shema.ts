import { gql } from "@apollo/client"

export const CREATE_USER = gql`
    mutation addUser($input: UserInput) {
        addUser(input: $input) {
            token
        }
    }
`
