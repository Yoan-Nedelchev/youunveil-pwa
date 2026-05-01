import { GraphQLClient } from "graphql-request";

export function createGraphqlClient(accessToken?: string) {
  const endpoint = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error("NEXT_PUBLIC_SUPABASE_GRAPHQL_URL is not set");
  }
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return new GraphQLClient(endpoint, { headers });
}
