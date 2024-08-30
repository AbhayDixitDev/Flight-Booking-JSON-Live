// See https://github.com/typicode/json-server#module
import { create, router as _router, defaults, rewriter } from 'json-server'
import { readFileSync } from 'fs'
import { join } from 'path'

// ...

const server = create()

// Allow write operations
const filePath = join('db.json')
const data = readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = _router(db)

// Comment out to prevent read-only file system error
// const router = jsonServer.router('db.json')

const middlewares = defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
export default server























// // See https://github.com/typicode/json-server#module
// const jsonServer = require('json-server')

// const server = jsonServer.create()

// // Uncomment to allow write operations
// // const fs = require('fs')
// // const path = require('path')
// // const filePath = path.join('db.json')
// // const data = fs.readFileSync(filePath, "utf-8");
// // const db = JSON.parse(data);
// // const router = jsonServer.router(db)

// // Comment out to allow write operations
// const router = jsonServer.router('db.json')

// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server
