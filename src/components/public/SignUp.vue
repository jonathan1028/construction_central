<template>
  <div class="signUpContainer">
    <div class="companyName">Construction Central</div>
    <div class="inputs">
      <div class="field">
        <label for="">First Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="">
      </div>
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="email"
          type="text"
          placeholder="Email">
      </div>
      <!-- <div class="field">
        <label for="">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Citizen">
      </div> -->
      <div class="field">
        <label for="">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div>
      <button
        @click="signUp"
        class="_button1"
      >
        Sign Up
      </button>
    </div>
    <!-- <div class="linkBlock">
      <router-link
        class="link"
        to="login"
      >
        Already have an account? Login
      </router-link>
    </div> -->
    <h1>Users: </h1>
    <ul>
      <li>{{users.length}} - {{users[users.length-1].name}}, {{users[users.length-1].email}}, {{users[users.length-1].password}}</li>
      <li>{{users.length-1}} - {{users[users.length-2].name}}, {{users[users.length-2].email}}, {{users[users.length-2].password}}</li>
      <li>{{users.length-2}} - {{users[users.length-3].name}}, {{users[users.length-3].email}}, {{users[users.length-3].password}}</li>
    </ul>
    <h1>Posts: </h1>
    <ul>
      <li>{{feed}}</li>
    </ul>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  // import { USER_ID, AUTH_TOKEN  } from '../constants'
  const SIGNUP_USER_MUTATION = gql `
    mutation SignupUserMutation($email: String!, $password: String!, $name: String!) {
      signup(email: $email, password: $password, name: $name) {
        token
        user{
          id
          name
          email
        }
      }
    }
  `

  const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
      users {
        id
        name
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
          name
        }
      }
    }
  `

  export default {
    data: () => ({
      email: '',
      password: '',
      name: '',
      users: [],
      feed: []
    }),
    // Attribute
    methods: {
      signUp() {
        const email = this.email
        const password = this.password
        const name = this.name
        // Mutation
        this.$apollo.mutate({
          mutation: SIGNUP_USER_MUTATION,
          variables: {
            name,
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
.signUpContainer {
  width: 25vw;
  background-color: var(--background-color2);
  // height: 40vh;
  border: 1px solid black;
  margin: auto;
  margin-top: 15vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.companyName {
  margin-top: 8vh;
  margin-bottom: 5vh;
  color: var(--font-color1);
  font-size: 4vh;
}
.inputs {
  // margin-top: 5vh;
}
.field {
  width: 100%;
  margin-bottom: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  color: var(--font-color3);
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 100%;
  font-size: 2vh;
  // margin-top: 5vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// button {
//   width: 100%;
//   margin-top: 5vh;
//   background-color: #efba34;
//   border-radius: 3vh;
// }
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
</style>