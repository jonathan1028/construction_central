<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
      <!-- <h2>New Category</h2> -->
    </div>
    <div class="modal-body">
        <div class="modal-field-label">Add Category</div>
        <select 
            class="modal-field-select"
            v-model="selected">
            <!-- <option v-for="category in categories" v-bind:value="category.value"> -->
            <option v-for="category in categories">
            {{ category }}
            </option>
        </select>
    </div>
    <div class="modal-footer">
      <button 
        class="__button-style1"
        @click="cancel()">
        Cancel
      </button>
      <button 
        class="__button-style1"
        @click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: 'CreateMedallionModal',
  data () {
    return {
      name: "",
      unit: "",
      cost: "",
      selected: "",
      categories: ["Foundation","Framing","Wallboard"]
    }
  },
  methods: {
    cancel () {
      // this.$store.commit('toggleCreateMedallionModal')
      this.$apolloProvider.defaultClient.writeData({ data: { categoryCreateModalState: !this.categoryCreateModalState } })
    },
    submit () {
      console.log('Modal Items', this.qty, this.email, this.currentUserId)
      this.$apollo.query({
        query: GET_USER_QUERY,
        variables: {
          email: this.email
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        if (result.data.User === null) {
          console.error('User with this email address cannot be found')
        } else {
          this.$apollo.mutate({
            mutation: CREATE_MEDALLION_MUTATION,
            variables: {
              ownedById: result.data.User.id,
              issuedById: this.currentUserId,
              message: this.message,
              category: this.category
            }
          }).catch((error) => {
            console.error(error)
          }).then((result) => {
            console.log('Medallion Created', result)
          })
        }
      })
      this.$store.commit('toggleCreateMedallionModal')
    }
  },
  apollo: {
    categoryCreateModalState: {
      query: gql`{categoryCreateModalState @client}`
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-body {
    display: grid;
    grid-template-columns: max-content 1fr;
}
.modal-field-label {
    font-size: 2vmax;
    margin-right: 1vw;
}

</style>