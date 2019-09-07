import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import router from './router'
import { onError } from 'apollo-link-error'
import { ApolloLink, concat, split } from 'apollo-link'
import { typeDefs, resolvers } from './resolvers';

// This errorLink item gives us detailed error messages from the server rather than the generic "server error" message
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

// new ApolloClient({
//   ...
//   link: ApolloLink.from([errorLink, authLink, restLink, httpLink]),
// })
Vue.config.productionTip = false

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

// This implementation
const cache = new InMemoryCache()

cache.writeData({
  data: {
    myApolloTest: 'Test, test, test',
    itemCreateModalState: false,
    categoryCreateModalState: false
  },
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  typeDefs,
  resolvers: {}
})


Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app')
