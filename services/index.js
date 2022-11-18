import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.HYGRAPH_ENDPOINT;


// query function
export const getPosts =  async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                        }
                        date
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    //api reuqest call
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges;
}