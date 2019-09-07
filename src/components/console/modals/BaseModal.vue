<template>
  <div class="modal _box-shadow1">
    <div class="modal-header"></div>
    <div class="modal-body">
        <item-create v-if="itemCreateModalState"></item-create>
        <category-create v-if="categoryCreateModalState"></category-create>
    </div>
    <div class="modal-footer"></div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ItemCreate from "./ItemCreate"
import CategoryCreate from "./CategoryCreate"
export default {
  name: 'CreateMedallionModal',
  components: {
      ItemCreate,CategoryCreate
  },
  data () {
    return {
      name: "",
      unit: "",
      cost: ""
    }
  },
  apollo: {
    itemCreateModalState: {
      query: gql`{itemCreateModalState @client}`
    },
    categoryCreateModalState: {
      query: gql`{categoryCreateModalState @client}`
    }
  },
}
</script>

<style lang="scss">
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 24.25vw;
  top: 15vh;
  width: 45vw; /* Full width */
  height: auto; /* Full height */
  margin-left: auto;
  margin-right: auto;
  padding: 5vh;
  // overflow: auto; /* Enable scroll if needed */
  opacity: 1;
  background-color: #fefefe;
  animation-name: animatetop;
  animation-duration: 0.4s
}
.modal-header {
}
.modal-body {
  padding: 3vh 2vh;
}
.modal-footer {
  margin-top: 5vh;
  display: flex;
  justify-content: space-around;
  button {
    margin: 0vh 1vw;
  }
}
.field {
  margin-top: 2vh;
}
/* Add Animation */
@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 15vh; opacity: 1}
}
.modal-background {
  z-index: -1;
}

</style>