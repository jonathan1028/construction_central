<template>
  <div class="layout">
    <div class="header">
      <div class="logo">Construction Central</div>
      <div class="navigation">
          <!-- <router-link to="/admin">About</router-link>
          <div>|</div>
          <router-link to="/newusers">Contact</router-link> -->
      </div>
      <div class="login">
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view class="content gradient"></router-view>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'PublicHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  display: grid;
  grid-template-rows: 7vh 86vh 7vh;
  grid-template-areas: 
  "header"
  "content"
  "footer";
}
.header{
  grid-area: header;
  display: grid;
  grid-template-columns: 40% 10% 50%;
  grid-template-areas:
  "logo navigation login";
  padding: 1vh 1vw;
  .logo{
    grid-area: logo;
    font-size: 3vmax;
    align-self: center;
  }
  .navigation{
    grid-area: navigation;
    align-self: center;
  }
  .login{
    grid-area: login;
    justify-self: end;
    align-self: center;
  }
}
.content{
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
</style>