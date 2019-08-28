<template>
  <div class="page--layout">
    <div class="title">
      <h1>Create Takeoff</h1>
    </div>
    <!-- <div class="buttons">
      <router-link to="/takeoffs/create" class="__button-style1" tag="button">New Takeoff</router-link>
    </div> -->
    <!-- <div class="search">
      <input
        name="query"
        v-model="takeoffsQuery"
        placeholder="Search takeoffs..."
      >
    </div> -->
    <div>
        <div>{{project.name}}</div>

        
        <div 
            class="categories" 
            v-for="(takeoff,index) in project.takeoffs">
            <div>{{takeoff.name}}</div>
            <div class="table--header">
                <div class="title left-align">Item</div>
                <div class="title">Count</div>
                <div class="title">Unit</div>
                <div class="title">Multiplier</div>
                <div class="title">Waste</div>
                <div class="title">Quantity</div>
            </div>
            <div 
                class="items"
                v-for="(item,index) in takeoff.items">
                <div class="item2 left-align">{{item.name}}</div>
                <div class="item2">
                    <!-- </input>{{item.count}}</div> -->
                    <input
                        name="query"
                        v-model="item.count"
                        placeholder="Search takeoffs..."
                    >
                </div>
                <div class="item2">{{item.unit}}</div>
                <div class="item2">
                    <input
                        name="query"
                        v-model="item.multiplier"
                        placeholder="Search takeoffs..."
                    >
                </div>
                <div class="item2">
                    <input
                        name="query"
                        v-model="item.waste"
                        placeholder="Search takeoffs..."
                    >
                </div>
                <div class="item2">{{calculateQuantity(item.count, item.multiplier, item.waste)}}</div>
                <!-- <div class="item2">55</div> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
   name: 'Takeoffs',
    data () {
        return {
            takeoffsQuery: "",
            project: {
                name: "My 1st Project",
                takeoffs: [
                    {
                        name: "Framing Takeoff",  
                        items: [
                            {
                                name: '2"x4"x8 stud',
                                count: 5,
                                unit: "LF",
                                multiplier: 0.75,
                                waste: 0.2,
                                quantity: null 
                            },
                            {
                                name: "OSB Sheathing",
                                count: 3,
                                unit: "SF",
                                multiplier: 0.75,
                                waste: 0.2,
                                quantity: null  
                            },
                            {
                                name: "Zip Tape",
                                count: 22,
                                unit: "SF",
                                multiplier: 0.75,
                                waste: 0.2,
                                quantity: null  
                            },
                            {
                                name: '2"x10x10 pine',
                                count: 7,
                                unit: "LF",
                                multiplier: 0.75,
                                waste: 0.2,
                                quantity: null 
                            }
                        ]
                    }
                ]
            }
        }
    },
//   computed: {
//     calculateQuantity: {
//       get () {
//         return this.$store.state.searchQueryFilters.keywords
//       },
//       set (value) {
//         let newObj = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
//         newObj.keywords = value
//         this.$store.commit('updateSearchQueryFilters', newObj)
//       }
//     }
//   },
  methods: {
    calculateQuantity(count, multiplier, waste) {
        return Math.round(count * multiplier * waste)
    }
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
    .table--header {
        margin-left: 2vw;
        display: grid;
        grid-template-columns: 25% 10% 10% 10% 20% 25%;
        .title {
            //   border: 1px solid black;
            text-align: right;
            font-weight: 900;
           
        }
         .left-align {
            text-align: left;
        }
    }
    .categories {
        margin-left: 2vw;
    }
    .items {
        margin-left: 2vw;
        display: grid;
        grid-template-columns: 25% 10% 10% 10% 20% 25%;
        .item2 {
            border: 1px solid black;
            text-align: right;
            width: 100%;
            input {
                //  justify-content: end;
                width: 100%;
                text-align: right;
                //  background-color: yellow; 
                border: none;
            }
        }
        .left-align {
            text-align: left;
        }
    }
    
}
</style>