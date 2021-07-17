const wreck = require('@hapi/wreck')
const { chApi, chApiId, chApiKey } = require('../config')

module.exports = [{
  method: 'GET',
  path: '/{path*}',
  options: {
    description: 'Get calls on Crown Hosting endpoints',
    notes: 'Returns data from Crown Hosting endpoint',
    tags: ['api']
  },
  handler: (request, h) => {
    return h.proxy(proxyCall(request, h))
  }
},
{
  method: 'POST',
  path: '/{path*}',
  options: {
    description: 'Post calls on Crown Hosting endpoints',
    notes: 'Returns data from Crown Hosting endpoint',
    tags: ['api'],
    payload: { parse: false }
  },
  handler: (request, h) => {
    return h.proxy(proxyCall())
  }
}]

const proxyCall = () => {
  return {
    mapUri: (req) => {
      const query = req.url.search ? req.url.search : ''
      console.log(`Query: ${query}`)
      console.log('==========')
      console.log(req)
      console.log('==========')
      console.log(req.headers)

      return {
        uri: `${chApi}${request.path}${query}`,
        headers: {
          'api-id': chApiId,
          'api-key': chApiKey
        },
        passThrough: true,
        xforward: true
      }
    },
    onResponse: async (err, res) => {
      if (err) {
        console.log(`Error: ${err}`)
      }
      const payload = await wreck.read(res, { json: true })
      const response = h.response(payload)
      response.headers = res.headers
      return response
    }
  }
}
