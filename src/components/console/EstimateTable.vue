<template>
  <div class="page-layout">
    <div class="page-header">
      <h1>{{project.name}} - {{estimate.name}}</h1>
    </div>
    <div class="page-actions">
        <button 
            class="__button-style1"
            @click="openItemCreateModal">
            Add Item
        </button>
        <button 
            class="__button-style1"
            @click="openCategoryCreateModal">
            Add Category
        </button>
        <!-- <router-link to="/estimating/create" class="__button-style1" tag="button">Add Item</router-link> -->
        <!-- <router-link to="/estimating/create" class="__button-style1" tag="button">Add Category</router-link> -->
        <router-link to="/estimating/create" class="__button-style1" tag="button">Save as Template</router-link>
        <router-link to="/estimating/create" class="__button-style1" tag="button">Attach Takeoff</router-link>
    </div>
    <div class="page-content">
        <div 
            class="table" 
            v-for="(category,index) in estimate.categories">
            <!-- <div>{{category.name}}</div> -->
            <div class="table-header">
                <div class="title left-align">{{category.name}}</div>
                <div class="title">Qty</div>
                <div class="title">Unit</div>
                <div class="title">Cost</div>
                <div class="title">Total</div>
                <!-- <div class="title">Quantity</div> -->
            </div>
            <div
                v-if="!item.takeoff"
                class="row"
                v-for="(item,index) in category.items">
                <div class="cell left-align">{{item.name}}</div>
                <div class="cell">
                    <input
                        name="query"
                        v-model="item.quantity"
                    >
                </div>
                <div
                    class="cell">
                    <input
                        name="query"
                        v-model="item.unit"
                    >
                </div>
                <div class="cell">
                    <input
                        name="query"
                        v-model="item.cost"
                    >
                </div>
                <div class="cell">{{calculateItemTotal(item.quantity, item.cost)}}</div>
            </div>
            <div
                v-if="item.takeoff"
                class="row"
                v-for="(item,index) in category.items">
                <div class="cell left-align">{{item.name}}</div>
                <div class="cell">
                    <!-- <input
                        name="query"
                        v-model="item.quantity"
                    > -->
                </div>
                <div
                    class="cell">
                    <!-- <input
                        name="query"
                        v-model="item.unit"
                    > -->
                    <button class="__button-style1">{{item.unit}}</button>

                    
                </div>
                <div class="cell">
                    <!-- <input
                        name="query"
                        v-model="item.cost"
                    > -->
                </div>
                <div class="cell">{{calculateItemTotal(item.quantity, item.cost)}}</div>
            </div>
            <div class="last-row">
                <div class="cell left-align">Subtotal</div>
                <div class="cell amount">{{calculateCategoryTotal(category)}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
   name: 'Takeoffs',
    data () {
        return {
            takeoffsQuery: "",
            project: {
                name: "1234 Main Street"
            },
            estimate: {
                name: "Estimate 1",
                categories: [
                     {
                        name: "Foundation",  
                        items: [
                            {
                                name: 'Foundation labor',
                                quantity: 5,
                                unit: "LF",
                                cost: 1.25
                            },
                            {
                                name: "Foundation materials",
                                quantity: 3,
                                unit: "SF",
                                cost: 12 
                            },
                        ]
                    },
                    {
                        name: "Framing",  
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
    calculateItemTotal(quantity, cost) {
        return (quantity * cost).toFixed(2)
    },
    calculateCategoryTotal(category) {
        var categoryTotal = 0
        category.items.forEach(function(item){
            categoryTotal += item.quantity * item.cost
        })
        return (categoryTotal).toFixed(2)
    },
    openItemCreateModal() {
        console.log("Open item create modal",this.itemCreateModalState)
        console.log(this.$apolloProvider)
        // this.$apolloProvider.defaultClient.readQuery({})
        // this.itemCreateModalState = !this.itemCreateModalState
        this.$apolloProvider.defaultClient.writeData({ data: { itemCreateModalState: !this.itemCreateModalState } })
        console.log("After mutation",this.itemCreateModalState)

    },
    openCategoryCreateModal() {
        console.log("Test")
        this.$apolloProvider.defaultClient.writeData({ data: { categoryCreateModalState: !this.categoryCreateModalState } })

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

<style lang="scss" scoped>
.page-layout {
    display: grid;
    grid-template-areas:
    "page-header"
    "page-actions"
    "page-content";
    grid-template-rows: 5vh 5vh 70vh;
    padding: 2vh 5vw;
    .page-header {
        grid-area: page-header;
        text-align: center;
    }
    .page-actions {
        grid-area: page-actions;
        margin-top: 1vh;
        button {
            width: max-content;
            height: 100%;
            margin-right: 1vw;
        }
    }
    .page-content {
        grid-area: page-content;
        margin-top: 1vh;
    }
    .table {
        font-size: 1.5vmax;
        input {
            font-size: 1.5vmax;
        }
        .table-header {
            display: grid;
            grid-template-columns: 22vw 10vw 10vw 10vw 10vw;
            background-color: lightblue;
            .title {
                text-align: right;
                font-weight: 900;
            }
            .left-align {
                text-align: left;
            }
        }
        .row {
            margin-left: 2vw;
            display: grid;
            grid-template-columns: 20vw 10vw 10vw 10vw 10vw;
            border: none;
            border-bottom: 2px solid black;
            
            .cell {
                text-align: right;
                width: 100%;
                padding-right: 1vw;
                input {
                    width: 100%;
                    text-align: right;
                    // padding: 0vh 1vw;
                    border: none;
                    // background-color: lightgray;
                }
              
            }
            .left-align {
                text-align: left;
            }
        }
        .takeoff-row {
            background-color: yellow;
            color: green;
            border-bottom: 5px solid red;
        }
        .row:nth-child(even) {
            // background-color: #f2f2f2;
        }
        .last-row {
            display: grid;
            grid-template-columns: 50vw 10vw;
            margin-left: 2vw;
            margin-bottom: 1vh;
            font-weight: 900;
            .cell {
                text-align: right;
                width: 100%;
                padding-right: 1vw;
                // input {
                //     width: 100%;
                //     text-align: right;
                //     border: none;
                // }
            }
            .left-align {
                text-align: left;
            }
        }
    }
    

    
}
</style>