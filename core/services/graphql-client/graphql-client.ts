import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLClientService } from "@core/types";

export const client = new ApolloClient({
  uri: "https://api-us-east-1.hygraph.com/v2/cl7csc6zm4gdr01t24df50scw/master",
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
