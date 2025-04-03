import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export function provideGraphQLClient() {
  return provideApollo((): ApolloClientOptions<any> => {
    const httpLink = new HttpLink({ uri: 'http://localhost:4040/graphql' }); //!

    const authLink = setContext(() => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
    });

    return {
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    };
  });
}
