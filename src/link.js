/*** LINK ***/
import { HttpLink } from "@apollo/client";

export const link = new HttpLink({
  uri: "https://current--spotify-demo-graph-xwl7eg.apollographos.net/graphql",
});
