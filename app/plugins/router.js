const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/organisation')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
