const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const routerViews = require('./routes/views.router.js')

const app = express()
const httpServer = app.listen(8080, () => console.log('Server Up'))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
// app.set('views','./src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', routerViews)


let log = []

socketServer.on('connection', (socketClient) => {
    console.log(`Nuevo cliente ${socketClient.id} conectado...`)
    socketClient.on('message', (data) => {
        console.log(`Me enviaron: ${data}`)
        log.push(data)
        // socketClient.emit('history', log)
        socketServer.emit('history', log)
    })
})

