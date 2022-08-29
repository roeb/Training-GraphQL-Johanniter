import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain="meyer-consulting.eu.auth0.com" clientId="et4oDR3H20lRf06uGEhiYnlkTqjuXWd3" redirectUri={window.location.origin}>
      <ApolloProvider client={createApolloClient()}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
