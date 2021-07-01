const hapi = require('@hapi/hapi')
const H2o2 = require('@hapi/h2o2')
const config = require('./config')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '1.0.1'
    }
  }

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(H2o2)
  await server.register(require('./plugins/router'))
  await server.register(require('blipp'))
  await server.register(require('./plugins/logging'))
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: require('hapi-swagger'),
      options: swaggerOptions
    }
  ])

  return server
}

module.exports = createServer
