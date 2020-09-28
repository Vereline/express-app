import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
// import { createUploadLink } from 'apollo-upload-file'

const uri = 'http://localhost:3005/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  // const http = httpLink.create({uri});
  const http = createUploadLink({uri})
  
  const authLink = new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            'Authorization': token ? `JWT ${token}` : ''
        }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
