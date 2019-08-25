<template>
  <div class="page1 gradient1">
    <div class="login-container gradient1">
      <div class="company-name">Construction Central</div>
      <div class="inputs">
        <!-- <div class="field"> -->
          <!-- <label for="">Email</label> -->
          <input
            v-model="email"
            type="text"
            placeholder="Email address">
        <!-- </div> -->
        <!-- <div class="field"> -->
          <!-- <label for="">Password</label> -->
          <input
            v-model="password"
            type="password"
            placeholder="Password">
        <!-- </div> -->
        <button
          class="__button-style1"
          @click="login">
          LOGIN
        </button>
      </div>
      <!-- <div class="forgot-password align-right">
        <router-link
          class="link"
          to="signup"
        >
          Forgot Password?
        </router-link>
      </div> -->
      
      <div class="account-links">
        <router-link
          class="link"
          to="signup"
        >
          No account? Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  // import { USER_ID, AUTH_TOKEN  } from '../../constants'
  const LOGIN_USER = gql `
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user{
          id
          name
          email
        }
      }
    }
  `
  export default {
    data: () => ({
      email: '',
      password: ''
    }),
    // Attribute
    methods: {
      login() {
        const email = this.email
        const password = this.password
        // Mutation
        this.$apollo.mutate({
          mutation: LOGIN_USER,
          variables: {
            email,
            password,
          },
        }).then((result) => {
          // Result
          console.log(result);
          const user = result.data.login.user
          const token = result.data.login.token
          this.saveUserData(user, token)
          this.$router.push({ path: '/dashboard' })
        }).catch((error) => {
          // Error
          alert(`Error logging in.`)
          console.error(error)
        })
      },
      saveUserData (user, token) {
        localStorage.USER_ID = user.id
        localStorage.AUTH_TOKEN = token
      }
    }
  }
</script>

<style lang="scss" scoped>
.page1 {
  height: 100%;
  // background-color: blue;
  .login-container {
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