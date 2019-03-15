import ApolloClient from 'apollo-boost'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import gql from 'graphql-tag'
import { serverUrl } from 'tv/frontend/services/conf'

require('tv/frontend/style/index.scss')

export const apolloClient = new ApolloClient({
  uri: `${serverUrl}/graphql`,
})

export function testQuery() {
  apolloClient
    .query({
      query: gql`
        query MY_TEST_QUERY {
          me {
            shows {
              name
            }
          }
        }
      `,
    })
    .then(result => console.log(result))
}

testQuery()
