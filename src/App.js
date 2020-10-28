import Schedule from './Components/Schedule';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink } from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

function App() {
  const link = createHttpLink({
    uri: "https://schedule.hasura.app/v1/graphql"
  });
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Schedule/>
    </ApolloProvider>
  );
}

export default App;
