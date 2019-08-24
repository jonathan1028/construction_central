import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import router from './router'
import { onError } from 'apollo-link-error'
import { ApolloLink, concat, split } from 'apollo-link'

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

// End point for WSS: wss://eu1.prisma.sh/jonathan-75b87e/construction_central/dev

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
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
