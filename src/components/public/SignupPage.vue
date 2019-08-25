<template>
  <div class="page">
    <div class="signup-container">
      <div class="company-name">Construction Central</div>
      <div class="inputs">
        <div class="field">
          <!-- <label for="">First Name</label> -->
          <input
            v-model="firstName"
            type="text"
            placeholder="First name">
        </div>
        <div class="field">
          <!-- <label for="">Last Name</label> -->
          <input
            v-model="lastName"
            type="text"
            placeholder="Last name">
        </div>
        <div class="field">
          <!-- <label for="">Email</label> -->
          <input
            v-model="email"
            type="text"
            placeholder="Email">
        </div>
        <div class="field">
          <!-- <label for="">Password</label> -->
          <input
            v-model="password"
            type="password"
            placeholder="Password">
        </div>
        <button
          @click="signUp"
          class="__button-style1"
        >
          Sign Up
        </button>
      </div>

      <div class="account-links">
        <router-link
          class="link"
          to="login"
        >
          Already have an account? Login
        </router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
  import gql from 'graphql-tag'
  // import { USER_ID, AUTH_TOKEN  } from '../constants'
  const SIGNUP_USER_MUTATION = gql `
    mutation SignupUserMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
      signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
        token
        user{
          id
          firstName
          lastName
          email
        }
      }
    }
  `

  const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
      users {
        id
        firstName
        lastName
        email
      }
    }
  `

  const ALL_POSTS_QUERY = gql`
    query AllPostsQuery {
      feed {
        id
        title
        content
        author {
          id
          firstName
          lastName
        }
      }
    }
  `

  export default {
    data: () => ({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      users: [],
      feed: []
    }),
    // Attribute
    methods: {
      signUp() {
        const email = this.email
        const password = this.password
        const firstName = this.firstName
        const lastName = this.lastName
        // Mutation
        this.$apollo.mutate({
          mutation: SIGNUP_USER_MUTATION,
          variables: {
            firstName,
            lastName,
            email,
            password
          }
        }).then((result) => {
          // Result
          console.log(result);
          localStorage.USER_ID = result.data.signup.user.id
          localStorage.token = result.data.signup.token
          // this.saveUserData(user, token)
          this.$router.push({ path: 'dashboard' })
        }).catch((error) => {
          // Error
          alert(`Signup failed.`)
          console.error(error)
        })
      },
    },
    apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
      users: {
        query: ALL_USERS_QUERY
      },
      feed: {
        query: ALL_POSTS_QUERY
      }
    }
  }
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  // background-color: blue;
  .signup-container {
    display: grid;
    grid-template-areas:
    "company-name"
    "inputs"
    "account-links";
    background-color: white;
    color: var(--color5);
    width: 25vw;
    border: 1px solid black;
    margin: auto;
    margin-top: 10vh;
    padding: 4vh 2vw;
    text-align: center;
    .company-name {
      grid-area: company-name;
      font-size: 4vh;
    }
    .inputs{
      grid-area: inputs;
      justify-self: center;
      padding-top: 8vh;
      // border: 1px solid black;
      .field {
        width: 100%;
      }
      input{
        width: 100%;
        margin-bottom: 4vh;
      }
      width: 100%;
      // justify-items: center;
    }
    .account-links{
      grid-area: account-links;
      padding-top: 8vh;
    }
    .gradient1 {
      color: white;
      background: -moz-linear-gradient(325deg, rgba(45,48,245,1) 0%, rgba(35,150,153,1) 100%); /* ff3.6+ */
      background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(45,48,245,1)), color-stop(100%, rgba(35,150,153,1))); /* safari4+,chrome */
      background: -webkit-linear-gradient(325deg, rgba(45,48,245,1) 0%, rgba(35,150,153,1) 100%); /* safari5.1+,chrome10+ */
      background: -o-linear-gradient(325deg, rgba(45,48,245,1) 0%, rgba(35,150,153,1) 100%); /* opera 11.10+ */
      background: -ms-linear-gradient(325deg, rgba(45,48,245,1) 0%, rgba(35,150,153,1) 100%); /* ie10+ */
      background: linear-gradient(125deg, rgba(45,48,245,1) 0%, rgba(35,150,153,1) 100%); /* w3c */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2D30F5', endColorstr='#239699',GradientType=1 ); /* ie6-9 */
    }
  }
}
  

</style>