<template>
  <div class="loginContainer">
    <div class="companyName">Construction Central</div>
    <div class="inputs">
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="email"
          type="text"
          placeholder="Your email address or mobile number">
      </div>
      <div class="field">
        <label for="">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div class="forgot-password align-right">
      <router-link
        class="link"
        to="signup"
      >
        Forgot Password?
      </router-link>
    </div>
    <div>
      <button
        class="_button1"
        @click="login">
        LOGIN
      </button>
    </div>
    <div class="linkBlock">
      <router-link
        class="link"
        to="signup"
      >
        Don't have an account? Sign Up
      </router-link>
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
        console.log("User", user)
        console.log("UserID",user.id)
        localStorage.USER_ID = user.id
        localStorage.AUTH_TOKEN = token
        // localStorage.TEST1 = "test2"
        // test = localStorage.USER_ID
        // console.log("Token", localStorage.TEST1)
        // this.$root.$data.token = localStorage.USER_ID
        // console.log("Test saved USER_ID", this.$root.$data.token)
        console.log("Test3", localStorage.USER_ID)
      }
    },
    computed: {
      canLogin: function () {
        return {
          disabled: !this.email && !this.password
        }
      },
      classObject: function(){
        return {
          dim: this.email && this.password
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.loginContainer {
  width: 25vw;
  border: 1px solid black;
  // height: 40vh;
  margin: auto;
  margin-top: 10vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.box {
}
.companyName {
  margin-top: 10vh;
  color: var(--text-color1);
  font-size: 4vh;
}
.field {
  width: 100%;
  margin-top: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: var(--font-color3);
  font-size: 1.8vh;
}
input {
  width: 100%;
  font-size: 2.2vh;
  color: var(--font-color1);
  padding: 1vh 0vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// This is a hack required to make the input background not turn yellow after
// user has entered data which is the default functionality for Chrome
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
}
button {
  margin-top: 1.2vh;
}
.forgot-password {
  margin-top: 0.5vh;
  margin-bottom: 2vh;
  .link {
    font-size: 2.5vh;
    color: var(--font-color1);
  }
}
.linkBlock {
  margin-top: 1.8vh;
  .link {
    font-size: 2.5vh;
    color: var(--font-color1);
  }
}
.align-right {
  text-align: right;
}
</style>