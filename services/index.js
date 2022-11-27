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

export const getPosts2 = async () => {
  const query = gql`
    query GetPostDetails{
          posts(
              orderBy: date_DESC
          ) {
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
    }`
  ;

  const result = await request(graphqlAPI, query);

  return result.posts;
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
                orderBy: date_DESC
                first: 3
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
        post(where: {slug: $slug}) {
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
    
    return result.post;

}

//submit comment
export const submitComment = async (obj) => {
   
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
   });

   return result.json();
}

//get comments
export const getComments = async (slug) => {
  const query = gql`
      query GetComments($slug: String!) {
          comments(where: {post: { slug: $slug}}){
              name
              createdAt
              comment
          }
      }
  `;
  
 
  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

//featured posts
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
        }
        featuredImage {
          url
        }
        title
        slug
        date
      }
    }   
  `;

  const result = await request(graphqlAPI, query);
  
  return result.posts;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
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
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};