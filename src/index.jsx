/*** APP ***/
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery
} from "@apollo/client";
import { link } from "./link.js";
import { Layout } from "./layout.jsx";
import "./index.css";

const GET_PLAYLISTS = gql`
  query GetPlaylists {
    featuredPlaylists {
      edges {
        node {
          id
          ... @defer {
            name @nonreactive
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, data } = useQuery(GET_PLAYLISTS);

  const [count, setCount] = useState(0);

  const edges = data?.featuredPlaylists.edges;

  useEffect(() => {
    if (edges?.length > 0) {
      setCount(count => count + 1);
    }
  }, [edges, setCount]);

  return (
    <main>
      <h3>Render count {count}</h3>

      <h2>Albums</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data?.featuredPlaylists.edges.map(({node}) => (
            <li key={node.id}>{node.id} {node.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>
);
