const proxy = require('http-proxy-middleware')

const BACKEND_PORT = 7776 // set backend port
const PATH = 'http://localhost:' + BACKEND_PORT

const STATIC_PAGE_PORT = 5010
const STATIC_PAGE_PATH = 'http://localhost:' + STATIC_PAGE_PORT

module.exports = function(app) {
  app.use(proxy('/call/', { target: PATH }))
  app.use(proxy('/apiadmin', { target: STATIC_PAGE_PATH }))
  app.use(proxy('/page', { target: STATIC_PAGE_PATH }))
  app.use(proxy('/contact', { target: STATIC_PAGE_PATH }))
}
