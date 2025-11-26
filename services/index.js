import { request, gql, GraphQLClient } from 'graphql-request';
import moment from 'moment';
const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

const getGraphQLClient = () => {
  const headers = {};
  if (process.env.HYGRAPH_TOKEN) {
    headers.authorization = `Bearer ${process.env.HYGRAPH_TOKEN}`;
  }
  return new GraphQLClient(graphqlAPI, { headers });
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const requestWithAuth = async (query, variables, retries = 3) => {
  try {
    if (!graphqlAPI) {
      throw new Error('NEXT_PUBLIC_HYGRAPH_ENDPOINT is not defined');
    }
    const client = getGraphQLClient();
    return await client.request(query, variables);
  } catch (error) {
    const status = error.response?.status;
    if (retries > 0 && (status === 429 || (status >= 500 && status < 600))) {
      const delay = 1000 * Math.pow(2, 3 - retries); // 1s, 2s, 4s
      console.warn(`Request failed with status ${status}. Retrying in ${delay}ms...`);
      await wait(delay);
      return requestWithAuth(query, variables, retries - 1);
    }
    console.error('GraphQL Request Error:', error);
    console.error('Endpoint:', graphqlAPI);
    console.error('Token present:', !!process.env.HYGRAPH_TOKEN);
    throw error;
  }
};

// query function
export const getPosts = async () => {
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
  `;
  //api reuqest call
  const result = await requestWithAuth(query);
  // Filter out posts with missing author or categories
  return result.postsConnection.edges.filter(
    ({ node }) => node.author && node.categories
  );
};

export const getPosts2 = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: date_DESC) {
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
  `;

  const result = await requestWithAuth(query);
  // Filter out posts with missing author
  return result.posts.filter((post) => post.author);
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

  const result = await requestWithAuth(query);

  return result.categories;
};

// Recent Posts
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: date_DESC, first: 3) {
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

  const result = await requestWithAuth(query);

  return result.posts;
};

// Similar/Related Posts
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
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
  const result = await requestWithAuth(query, { categories, slug });

  return result.posts;
};

//post detaails
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      # Only get the data that has the same slug with our post
      post(where: { slug: $slug }) {
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

  const result = await requestWithAuth(query, { slug });

  // Return null if post or author is missing
  if (!result.post || !result.post.author) {
    return null;
  }

  return result.post;
};

//submit comment
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

//get comments
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      post(where: { slug: $slug }) {
        comments {
          name
          createdAt
          comment
        }
      }
    }
  `;

  const result = await requestWithAuth(query, { slug });

  return result.post?.comments || [];
};

//featured posts
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost {
      posts(where: { featuredPost: true }) {
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

  const result = await requestWithAuth(query);

  // Filter out posts with missing author
  return result.posts.filter((post) => post.author);
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
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

  const result = await requestWithAuth(query, { slug });

  // Filter out posts with missing author
  return result.postsConnection.edges.filter(({ node }) => node.author);
};