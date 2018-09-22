// const WebSocket = require('ws')
// const faker = require('faker')

// const wss = new WebSocket.Server({ port: 9090 })

// let store = {}
// let table_ids = []
// let table_count = 4 // getRandomInt(1,2)
// for (let i = 0; i < table_count; i++) {
//   table_orders = getRandomInt(2, 10)
//   table_id = getRandomInt(1, 100)
//   store[table_id] = {}
//   table_ids.push(table_id)
//   for (let j = 0; j < table_orders; j++) {
//     obj = {}
//     obj['table_id'] = table_id
//     obj['name'] = faker.random.words(getRandomInt(3, 7))
//     obj['id'] = j
//     obj['count'] = Math.floor(Math.random() * 8) + 1
//     // obj['done_count'] = Math.floor(obj['count'] * 3 / 4)
//     obj['done_count'] = 0
//     store[table_id][j] = obj
//   }
// }

// for(let i = 0; i < 5; i++) {
//   obj = {}
//   name_len = getRandomInt(5,20)
//   obj['table_id'] = getRandomInt(0,5)
//   obj['name'] = rand_name(name_len)
//   obj['id'] = i
//   obj['count'] = Math.floor(Math.random() * 8) + 1
//   obj['done_count'] = 0

//   store[i] = obj
// }

// sockets = []
// socks = new Set()
// wss.on('connection', function connection (ws) {
//   sockets.push(ws)
//   socks.add(ws)
//   console.log('Connected')
//   ws.on('close', function close () {
//     console.log('Disconnected')
//     socks.delete(ws)
//   })
//   ws.on('message', function incoming (message) {
//     console.log('received: %s', message)
//     message = message.substring(4).split(',')
//     let table_id = message[0]
//     let item_id = message[1]
//     console.log(store)

//     if (store[table_id][item_id].done_count < store[table_id][item_id].count) {
//       store[table_id][item_id].done_count += 1
//       for (let socket of socks) {
//         socket.send(JSON.stringify(store[table_id][item_id]))
//       }
//     }
//   })

//   for (table_index in store) {
//     for (index in store[table_index]) {
//       let obj = store[table_index][index]
//       ws.send(JSON.stringify(obj), function (err) {})
//     }
//   }

//   setInterval(function () {
//     let rand_table_id = table_ids[[Math.floor(Math.random() * table_ids.length)]]

//     let rand_id = 0
//     let obj = store[rand_table_id][rand_id]
//     obj['count'] += 1

//     let obj = {}
//     obj['table_id'] = rand_table_id
//     obj['name'] = faker.random.words(getRandomInt(3, 7))
//     let rand_id = getRandomInt(100, 1000)
//     obj['id'] = rand_id
//     obj['count'] = Math.floor(Math.random() * 8) + 1
//     obj['done_count'] = 0

//     store[rand_table_id][rand_id] = obj
//     ws.send(JSON.stringify(obj), function (err) {})
//     console.log('rand_table_id', rand_table_id, rand_id)
//   }, 6000)
// })

// function rand_name (n) {
//   var text = ''
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//   for (var i = 0; i < n; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

//   return text
// }

// function getRandomInt (min, max) {
//   return Math.floor(Math.random() * (max - min)) + min
// }
