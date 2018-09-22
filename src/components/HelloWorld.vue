<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-toolbar>
  <v-layout row justify-center class="content--wrap">

       <v-card class="card-table" v-for="table_index of ordered_tables">
        <v-card-title style="font-weight: bold; justify-content: center;">{{ tables[table_index].table_number }}</v-card-title>
    
        <v-divider></v-divider>
        <v-card-text>

          <table>
            <tbody>
              <tr v-for="(order, index) in tables[table_index].orders">
                <td @click="clicked(order)" >    
                  <p>{{ menu[order.id].name }}</p>
                  <b-progress class="mt-1" :max="order.count">
                    <b-progress-bar :value="order.done_count" variant="success">
                    </b-progress-bar>
                  </b-progress>
                </td>
                <td class="b-table">
                  <h1 class="o_count">
                    X{{ order.count }}
                  </h1>
                </td>
              </tr>
            </tbody>
          </table>

        </v-card-text>
        <v-card-actions style="background-color: #e0e0e0;" class=" darken-3 justify-center">
          <b-button style="width: 100%;" @click="on_table_order_done(tables[table_index])">Remove</b-button>
        </v-card-actions>
      </v-card>
  </v-layout>
</v-app>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      title: 'Restaurant',
      info: null,
      errored: false,
      data: {},
      counter: 0,
      max: 100,
      ordered_tables: [],
      showen_tables: new Set(),
      tables: {},
      menu: {}
    }
  },
  mounted () {
    /*
    axios
      .get('http://127.0.0.1:8080/tables_info/')
      .then(response => (
        this.info = response.data
      ))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      */

    this.$options.sockets.onmessage = (msg) => {
      msg = JSON.parse(msg.data)
      console.log('data', msg)
      switch (msg['type']) {
        case 'menu_item':
          this.handle_menu_item(msg)
          break
        case 'table_item':
          this.handle_table_item(msg)
          break
        case 'order':
          this.handle_order(msg)
          break
        case 'update_order':
          this.handel_order_update(msg)
          break
        case 'DONE':
          this.done_order(msg)
          break
      }
      /*
      console.log('NEW', msg.data)
      let data = JSON.parse(msg.data)
        // this.data.unshift(data)
      let objId = data['id']
      let tableId = data['table_id']
      if (!this.tables[tableId]) {
        this.tables[tableId] = {}
        this.tables[tableId].orders = {}
        this.tables[tableId].tableId = tableId
          // this.tables[tableId].tableId = tableId
      }
      this.tables[tableId].orders[objId] = data

      */
    }
  },

  computed: {
    total () {
      console.log('info', this.info)
      return this.info[0].orders.reduce(function (sum, order) {
        return sum + order.price
      }, 0)
    }
  },

  methods: {
    done_order (order) {
      let tableId = order.table_id
      let mealId = order.meal_id
      if (this.tables[tableId].orders[mealId].done_count < this.tables[tableId].orders[mealId].count) {
        this.tables[tableId].orders[mealId].done_count += 1
      }
      let newObj = []
      for (let index in this.ordered_tables) {
        // newObj[index] = this.ordered_tables[index]
        newObj.push(this.ordered_tables[index])
      }
      this.ordered_tables = newObj
    },
    handle_menu_item (meal) {
      delete meal['type']
      let mealId = meal.id
      this.menu[mealId] = meal
    },
    handel_order_update (order) {
      let tableId = order.table_id
      let mealId = order.id
      // let newCount = order.count

      if (this.showen_tables.has(tableId)) {
        // this.tables[tableId].orders[mealId].count = newCount
      } else {
        this.ordered_tables.push(tableId)
        this.showen_tables.add(tableId)
      }

      this.tables[tableId].orders[mealId] = order
      this.tables[tableId].orders[mealId].done_count = 0

      let newObj = []
      for (let index in this.ordered_tables) {
        // newObj[index] = this.ordered_tables[index]
        newObj.push(this.ordered_tables[index])
      }
      this.ordered_tables = newObj
    },
    handle_order (order) {
      let tableId = order.table_id
      let objId = order.id
      if (this.showen_tables.has(tableId)) {

      } else {
        this.ordered_tables.push(tableId)
        this.showen_tables.add(tableId)
      }
      this.tables[tableId].orders[objId] = order

      let newObj = []
      for (let index in this.ordered_tables) {
        // newObj[index] = this.ordered_tables[index]
        newObj.push(this.ordered_tables[index])
      }
      this.ordered_tables = newObj
    },
    handle_table_item (table) {
      let tableId = table.id
      let tableNumber = table.number
      if (!this.tables[tableId]) {
        let temp = {}
        temp.orders = {}
        temp.tableId = tableId
        temp.table_number = tableNumber
        // temp.notifications = 0
        // this.table_orders[tableId] = temp
        this.$set(this.tables, tableId, temp)
        // this.update_tables()
      }
      /*
      if (this.showen_tables.has(tableId)) {

      } else {
        this.ordered_tables.push(tableId)
        this.showen_tables.add(tableId)
      }
        // this.tables[table_id][obj_id] = data
      let newObj = {}

      for (let index in this.tables) {
        newObj[index] = this.tables[index]
      }
      this.tables = newObj
      */
    },
    on_table_order_done (table) {
      console.log('DELETING', table)
      let tableId = table.table_id
      var delIndex = this.ordered_tables.indexOf(tableId)
      this.ordered_tables.splice(delIndex, 1)
      this.showen_tables.delete(tableId)
      delete this.tables[tableId]

      let newObj = {}

      for (let index in this.tables) {
        newObj[index] = this.tables[index]
      }
      this.tables = newObj
    },

    clicked (order) {
      console.log('CLICKED', order)
      let itemId = order['id']
      let tableId = order['table_id']
      if (this.tables[tableId].orders[itemId].done_count < this.tables[tableId].orders[itemId].count) {
        // this.tables[tableId].orders[itemId].done_count += 1
        console.log('ORDER DONE', order, itemId, tableId)
        let msg = {
          table_id: tableId,
          meal_id: itemId
        }
        this.$socket.send(JSON.stringify(msg))
      }
    }
  },

  name: 'App'
}
</script>

<style scoped>
@import '../styles/main.css';
</style>