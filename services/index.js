import { graphqlSync } from 'graphql';
import { request, gql } from 'graphql-request';
import moment from 'moment';
const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

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
                        createdAt
                    }
                }
            }
        }
    `
    //api reuqest call
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges;
};
    
// Categories  
export const getCategories = async () => {
    const query = gql`
        query GetGategories {
            categories {
                name
                slug
            }
        }
    `;
    
   
    const result = await request(graphqlAPI, query);
  
    return result.categories;
  };
    
// Recent Posts
export const getRecentPosts = async () => {
    const query = gql`
      query GetPostDetails{
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
            date
        }
      }
    `;
    
    const result = await request(graphqlAPI, query);
    
    return result.posts;
  };


// Similar/Related Posts
export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result = await request(graphqlAPI, query, { categories, slug });
  
    return result.posts;
  };


//post detaails            
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
        # Only get the data that has the same slug with our post
        posts(where: {slug: $slug}) {
            title
            excerpt
            featuredImage {
                url
            }
            author {
                name
                bio
            }
            date
            slug
            content {
                raw
            }
            categories {
                name
                slug
            }
        }
    }
  `;
    
    
    const result = await request(graphqlAPI, query, { slug });
    
    return result.posts;

}