<template>
  <div class="page--layout">
    <div class="title">
      <h1>Estimates</h1>
    </div>
    <div class="buttons">
      <router-link to="/estimating/create" class="__button-style1" tag="button">New Estimate</router-link>
    </div>
    <div class="search">
      <input
        name="query"
        v-model="takeoffsQuery"
        placeholder="Search estimates..."
      >
    </div>
    <div class="table">
      <div>
        - Create/update takeoff page
        - Create takeoff table
        - Add new category to table
        - Add new item to table
        - Create place for user to make new Items
        - Create place for user make new Categories
        - Create template
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Takeoffs',
  data () {
    return {
      takeoffsQuery: ""
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page--layout {
  display: grid;
  grid-template-areas:
  "title"
  "buttons"
  "search"
  "table";
  grid-template-rows: 10% 5% 10% 70%;
  padding: 2vh 5vw;
  .title {
    grid-area: title;
  }
  .buttons {
    grid-area: buttons;
  }
  .search {
    grid-area: search;
    margin-top: 1vh;
    input {
      border: .25vh solid lightgray;
      border-radius: 1vh;
      padding-left: 0.5vw;
    }
  }
  .table {
    grid-area: table;
  }
  button {
    width: max-content;
    height: 100%;
  }
}
</style>