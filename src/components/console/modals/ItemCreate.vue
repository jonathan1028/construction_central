<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
      <h2>Issue Medallions</h2>
    </div>
    <div class="modal-body">
      <form action="">
        <div class="field">
          <label for="">No. of Medallions to Issue:</label>
          <input
            v-model="qty"
            type="number"
            placeholder="">
        </div>
        <div class="field">
          <label for="">User's Email:</label>
          <input
            v-model="email"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Message:</label>
          <input
            v-model="message"
            type="text"
            placeholder="">
        </div>
        <!-- <div class="field">
          <label for="">Category:</label>
          <select v-model="category">
            <option v-if="category === null" disabled :value="null">Select an option</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div> -->
      </form>
    </div>
    <div class="modal-footer">
      <button class="_button1"
        @click="submit()"
      >
        Submit
      </button>
      <button
        class="_button3"
        @click="cancel()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
// import { CREATE_MEDALLION_MUTATION } from '../../../constants/graphql/medallions'
// import { GET_USER_QUERY } from '../../../constants/graphql/users'
export default {
  name: 'CreateMedallionModal',
  data () {
    return {
      User: {},
      qty: '',
      email: '',
    //   currentUserId: this.$store.state.auth.user.id,
      message: '',
      category: null
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleCreateMedallionModal')
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
  }
}
</script>

<style lang="scss" scoped>
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