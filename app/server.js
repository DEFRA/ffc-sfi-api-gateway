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
      title: 'SFI Crown Hosting API Gateway Documentation',
      version: '1.0.1'
    }
  }

  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: require('hapi-swagger'),
      options: swaggerOptions
    }
  ])

  const router = config.useMock
    ? require('./plugins/mock-router')
    : require('./plugins/router')

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(H2o2, {
    passThrough: true
  })
  await server.register(router)
  await server.register(require('blipp'))
  // await server.register(require('./plugins/logging'))

  return server
}

module.exports = createServer
