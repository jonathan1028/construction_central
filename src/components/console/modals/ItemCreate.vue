<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
    </div>
    <div class="modal-body">
      <div class="modal-field-label">Add Item</div>
      <select 
          class="modal-field-select"
          v-model="selected">
          <!-- <option v-for="category in categories" v-bind:value="category.value"> -->
          <option v-for="item in items">
          {{ item.name }}
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
      items: [
        {
            name: '2"x4"x8 stud',
            quantity: 5,
            unit: "LF",
            cost: 2.98
        },
        {
            name: "OSB Sheathing",
            quantity: 3,
            unit: "SF",
            cost: 14.01 
        },
        {
            name: "Zip Tape",
            quantity: 22,
            unit: "SF",
            cost: 30.24  
        },
        {
            name: '2"x10x10 pine',
            quantity: 7,
            unit: "LF",
            cost: 11.98 
        },
        {
            name: 'Framing materials',
            quantity: null,
            unit: "Takeoff",
            cost: null,
            takeoff: true
        }
      ]
    }
  },
  methods: {
    cancel () {
      // this.$store.commit('toggleCreateMedallionModal')
      this.$apolloProvider.defaultClient.writeData({ data: { itemCreateModalState: !this.itemCreateModalState } })
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
    itemCreateModalState: {
      query: gql`{itemCreateModalState @client}`
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