const production = require('./environment.production')
const development = require('./environment.development')

if (process.env.NODE_ENV === 'production') {
  module.exports = production
} else {
  module.exports = development
}
