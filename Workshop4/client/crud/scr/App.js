// App.jsx
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Graph from './CRUD/Graph';

// Configura el cliente Apollo
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

// Componente principal de la aplicación envuelto con ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>GraphQL Careers</h1>
        <Graph /> {/* Utiliza el componente Graph aquí */}
      </div>
    </ApolloProvider>
  );
}

export default App;
