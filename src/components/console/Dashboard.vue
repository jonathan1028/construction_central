<template>
  <div class="feedPageLayout">
    <h1>Dashboard</h1>
    <div>
      <!-- <notifications-box
        class="notifications-component"
      ></notifications-box>
      <search
        class="search-component"
      ></search> -->
    </div>
  </div>
</template>

<script>
// import Feed from '../modules/Feed'
// import Search from '../modules/Search'
// import CreateMedallion from '../modals/CreateMedallion'
// import NotificationsBox from '../../globalModules/NotificationsBox'
// import Carousel from '../modules/Carousel'
// import ButtonMenu from '../../globalModules/ButtonMenu'
// import CreateVolunteeringLog from '../modals/CreateVolunteeringLog'
// import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql/opportunities'
// import CreateOpportunity from './CreateOpportunity'
export default {
  name: 'Dashboard',
  components: {
    // Feed, Search, NotificationsBox, CreateMedallion, Carousel, ButtonMenu, CreateVolunteeringLog
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      // showCreateMedallionModal: this.$store.showCreateMedallionModal
      // allOpportunities: [],
      // sortColumn: '',
      // searchQuery: '',
      // columns: [
      //   {dbField: 'name', title: 'Name'},
      //   {dbField: 'description', title: 'description'},
      //   {dbField: 'startTime', title: 'Start Time'},
      //   {dbField: 'endTime', title: 'End Time'},
      //   {dbField: 'address', title: 'Location'}
      // ]
    }
  },
  methods: {
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    // allOpportunities: {
    //   query: ALL_OPPORTUNITIES_QUERY
    // }
  }
}
</script>

<style lang="scss" scoped>
.feedPageLayout {
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