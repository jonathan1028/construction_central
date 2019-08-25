<template>
  <div class="layout">
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
  grid-template-rows: 93vh 7vh;
  grid-template-areas: 
  "content"
  "footer";
  .content{
    grid-area: content;
    // background-color: black;
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