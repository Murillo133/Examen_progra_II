import gpl from "graphql-tag";

export const AUTHORS_QUERY = gpl`
query($name:String, $country: String, $birth_date: DateTime, $page: Int!){
  authors(name:$name, country:$country, birth_date: $birth_date, page: $page){
    paginatorInfo{
        currentPage
        lastPage
        hasMorePages
      }
    data{
      id
      name
      country
      birth_date
    }
  }
}
`;


