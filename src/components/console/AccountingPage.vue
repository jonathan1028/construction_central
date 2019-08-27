<template>
  <div class="layout">
    <h1>Accounting</h1>
  </div>
</template>

<script>
export default {
  name: 'Accounting',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.layout {
  // margin-left: 5vw;
  // margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-template-areas:
     "left-column center-column right-column";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.--no-margin {
  margin-top: 0vh;
}
.feed-component {
  grid-area: feed-component;
}
.modal-area {
  grid-area: center-column;
}
</style>