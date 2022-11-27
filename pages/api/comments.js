/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

export default async function Comments(req, res) {
  const { name, email, slug, comment } = req.body
  const graphQLClient =  new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`
    }
  })
  /* mutation -> update or create data
     connect -> connecting name , email, and comment to a specific post
  */ 
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
   `;
  try {
    const result = await graphQLClient.request(query, req.body);
    return  res.status(200).send(result);
  }
  catch (error) {
    return  res.status(500).send(error);
  }
  

}
