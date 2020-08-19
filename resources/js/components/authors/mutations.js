import gpl from "graphql-tag";

export const CREATE_AUTHOR = gpl`
mutation($author: AuthorInput!) {
    createAuthor(input: $author){
        id
        name
        country
        birth_date
    }
}
`;

export const DELETE_AUTHOR = gpl`
mutation($id: ID!) {
    deleteAuthor(id: $id){
        id
    }
}
`;


