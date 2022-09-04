import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLClientService } from "@core/types";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.NEXT_PUBLIC_HYGRAPH_TOKEN as string,
  },
});

export class GraphQLClient implements GraphQLClientService {
  async query(query: any, variables?: Record<any, any>) {
    return await client.query({
      query,
      variables,
    });
  }
}
