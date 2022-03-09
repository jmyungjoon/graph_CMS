// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

import { GraphQLClient, gql } from 'graphql-request';

// type Data = {
//   name: string
// }

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, commnet: $comment, post: { connect: { slug: $slug}}}) {id}
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body)

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
