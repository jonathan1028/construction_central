<template>
  <div class="layout">
    <div class="header">
      <div class="logo">Construction Central</div>
      <div
        class="logout"
        @click="logout()">
        Log Out
      </div>
    </div>
    <div class="navigation">
      <router-link class="navigation-link" to="/contacts">Contacts</router-link>
      <router-link class="navigation-link" to="/leads">Leads</router-link>
      <router-link class="navigation-link" to="/takeoffs">Takeoffs</router-link>
      <router-link class="navigation-link" to="/estimating">Estimating</router-link>
      <!-- <router-link class="navigation-link" to="/labor">Labor</router-link> -->
      <router-link class="navigation-link" to="/projectmanagement">Project Mgmt</router-link>
      <router-link class="navigation-link" to="/accounting">Accounting</router-link>
    </div>
    <router-view class="page-content"></router-view>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleLayout',
  data () {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.USER_ID = ''
      localStorage.token = ''
      this.$router.push({ path: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  display: grid;
  grid-template-rows: 6vh 6vh 82vh 6vh;
  grid-template-areas: 
  "header"
  "navigation"
  "page-content"
  "footer";
  .header{
    grid-area: header;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas:
    "logo logout";
    padding: 1vh 1vw;
    .logo{
      grid-area: logo;
      font-size: 4vh;
      align-self: center;
    }
    .logout{
      grid-area: logout;
      justify-self: end;
      align-self: center;
      cursor: pointer;
    }
  }
  .navigation{
    grid-area: navigation;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    align-self: center;
    padding: 0vh 1vw;
    color: white;
    background-color: var(--color3);
    height: 100%;
    align-content: center;
    // align-self: center;
    // align-items: center;
    font-size: 2vh;
    .navigation-link {
      color: white;
      font-size: 2vh;
    }
  }
  .page-content{
    grid-area: page-content;
    // padding: 1vh 5vw;
  }
  .footer {
    grid-area: footer;
    background-color: var(--color3);
  }
  .gradient {
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

</style>