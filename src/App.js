import React, { useContext } from 'react';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';

import { AuthContext } from './AuthConfig';
import Header from './components/Header';

import Router from './Router';

function App() {
  const { authState } = useContext(AuthContext);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_ENDPOINT
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = authState;

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null
      }
    };
  });

  const link = authLink.concat(httpLink);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Container style={{ marginBottom: '30px' }}>
          <Router />
        </Container>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
